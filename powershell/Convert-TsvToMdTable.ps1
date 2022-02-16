Param(
    # True to use windows dialog boxes; otherwise false to use powershell host prompts.
    [bool]$UseWindowsPicker = $true,

    # Path to initial directory for file pickers. If this is null or empty, then the parent directory of $PSScriptRoot is used.
    [string]$InitialDirectory,

    # Number of columns to pad (starting from first column); -1 to pad all columns; otherwise null to prompt.
    [Nullable[int]]$PaddedColumnCount,

    # The starting line number (1-based) or null to prompt.
    [Nullable[int]]$StartLineNumber,

    # The ending line number; zero for all remaining lines; otherwise null to prompt.
    [Nullable[int]]$EndLineNumber,

    # True to use first row as heading; null to prompt
    [Nullable[bool]]$FirstRowAsHeading,

    # Names of headings; null to prompt. This is ignored if $FirstRowAsHeading is not null.
    [string[]]$HeadingNames
)

if ([string]::IsNullOrWhiteSpace($InitialDirectory)) {
    $InitialDirectory = [System.IO.Path]::GetDirectoryName($PSScriptRoot);
} else {
    $InitialDirectory = [System.IO.Path]::GetFullPath($InitialDirectory);
}

$InputFilePath = '';
if ($UseWindowsPicker) {
    Add-Type -AssemblyName 'System.Windows.Forms' -ErrorAction Stop;
    Add-Type -TypeDefinition @'
namespace WindowsHelper
{
    public class WindowOwner : System.Windows.Forms.IWin32Window
    {
        private System.IntPtr _handle;
        public WindowOwner() : this(System.Diagnostics.Process.GetCurrentProcess().MainWindowHandle) { }
        public WindowOwner(System.IntPtr handle) { _handle = handle; }
        public System.IntPtr Handle { get { return _handle; } }
    }
}
'@ -ReferencedAssemblies 'System.Windows.Forms', 'System.Diagnostics.Process', 'System.ComponentModel.Primitives' -ErrorAction Stop;
    $OpenFileDialog = [System.Windows.Forms.OpenFileDialog]@{
        AddExtension = $true;
        CheckFileExists = $true;
        DefaultExt = '.tsv';
        DereferenceLinks = $true;
        Filter = 'TSV Files (*.tsv)|*.tsv|Text Files (*.txt)|*.txt|Markdown Files (*.md)|*.md|All Files (*.*)|*.*';
        InitialDirectory = $InitialDirectory;
        RestoreDirectory = $true;
        Title = 'Select file containing TSV data';
    };
    $DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
    $DialogResult = $OpenFileDialog.ShowDialog([WindowsHelper.WindowOwner]::new());
    if ($DialogResult -ne [System.Windows.Forms.DialogResult]::OK) { return }
    $InputFilePath = $OpenFileDialog.FileName;
} else {
    InputFilePath = Read-Host -Prompt 'Path of file containing TSV data';
    if ([string]::IsNullOrWhiteSpace($InputFilePath)) { return }
    if (-not [System.IO.File]::Exists($InputFilePath)) {
        Write-Warning -Message 'Input file not found.';
        return;
    }
}
$FileInfo = $null;
$FileInfo = [System.IO.FileInfo]::new($InputFilePath);
if ($null -eq $FileInfo) {
    Write-Warning -Message 'Cannot validate path of file containing TSV data.';
    return;
}
$InputFilePath = $FileInfo.FullName;
$OutputFilePath = '';
if ($UseWindowsPicker) {
    $SaveFileDialog = [System.Windows.Forms.SaveFileDialog]@{
        AddExtension = $true;
        CheckPathExists = $true;
        DefaultExt = '.xml';
        DereferenceLinks = $true;
        Filter = 'Markdown Files (*.md)|*.md|All Files (*.*)|*.*';
        InitialDirectory = $InitialDirectory;
        FileName = [System.IO.Path]::Combine($InitialDirectory, "temp.md");
        OverwritePrompt = $true;
        RestoreDirectory = $true;
        Title = 'Specify Output Markdown File';
        ValidateNames = $true;
    };
    $DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
    $DialogResult = $SaveFileDialog.ShowDialog([WindowsHelper.WindowOwner]::new());
    if ($DialogResult -ne [System.Windows.Forms.DialogResult]::OK) { return }
    $OutputFilePath = $SaveFileDialog.FileName;
} else {
    $OutputFilePath = Read-Host -Prompt 'Output Markdown file path';
    if ([string]::IsNullOrWhiteSpace($OutputFilePath)) { return }
    if (-not [System.IO.Path]::IsPathRooted($OutputFilePath)) { $OutputFilePath = [System.IO.Path]::Combine($FileInfo.DirectoryName, $OutputFilePath) }
}
$FileInfo = $null;
$FileInfo = [System.IO.FileInfo]::new($OutputFilePath);
if ($null -eq $FileInfo) {
    Write-Warning -Message 'Cannot validate Markdown file path.';
    return;
}
if (-not $UseWindowsPicker) {
    if ($FileInfo.Exists) {
        $Choices = [System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]]::new();
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('Yes'));
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('No'));
        if ($Host.UI.PromptForChoice('Confirm Overwrite', 'Markdown file already exists. Overwrite?', $Choices, 1) -ne 0) { return }
    } else {
        if (-not $FileInfo.Directory.Exists) {
            Write-Warning -Message 'Parent directory of Markdown path does not exist.';
            return;
        }
    }
}

$SkipLines = 0;
$LineCount = -1;
$PadTo = -1;
if ($null -eq $StartLineNumber -or $null -eq $EndLineNumber -or $null -eq $PaddedColumnCount) {
    if ($UseWindowsPicker) {
        $LineNUmbersForm = [System.Windows.Forms.Form]@{
            Text = 'Line Numbers';
            AcceptButton = [System.Windows.Forms.Button]@{
                Anchor = ([System.Windows.Forms.AnchorStyles]([System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Right));
                Text = 'OK';
                DialogResult = [System.Windows.Forms.DialogResult]::OK;
                TabIndex = 2;
            };
            CancelButton = [System.Windows.Forms.Button]@{
                Anchor = ([System.Windows.Forms.AnchorStyles]([System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Right));
                Text = 'Cancel';
                DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
                TabIndex = 3;
            };
            TopMost = $true;
            AutoSize = $true;
            AutoSizeMode = [System.Windows.Forms.AutoSizeMode]::GrowAndShrink;
        }
        $RowIndex = 4;
        if ($null -eq $PaddedColumnCount) { $RowIndex = 5 }
        $OuterTableLayoutPanel = [System.Windows.Forms.TableLayoutPanel]@{
            Dock = [System.Windows.Forms.DockStyle]::Fill;
            AutoSize = $true;
            AutoSizeMode = [System.Windows.Forms.AutoSizeMode]::GrowAndShrink;
            ColumnCount = 2;
            RowCount = $RowIndex;
        };
        $OuterTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
        $OuterTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::Percent, 1.0)) | Out-Null;
        for ($i = 0; $i -lt $RowIndex; $i++) {
            $OuterTableLayoutPanel.RowStyles.Add([System.Windows.Forms.RowStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
        }
        $Label = [System.Windows.Forms.Label]@{
            Text = 'Start Line:';
            AutoSize = $true;
            Anchor = [System.Windows.Forms.AnchorStyles]::Right;
        };
        $Label.Font = [System.Drawing.Font]::new($Label.Font, ([System.Drawing.FontStyle]($Label.Font.Style -bor [System.Drawing.FontStyle]::Bold)));
        $OuterTableLayoutPanel.Controls.Add($Label, 0, 0);
        $OuterTableLayoutPanel.Controls.Add([System.Windows.Forms.Label]@{
            Text = 'End Line:';
            AutoSize = $true;
            Font = $Label.Font;
            Anchor = [System.Windows.Forms.AnchorStyles]::Right;
        }, 0, 1);
        $OuterTableLayoutPanel.Controls.Add([System.Windows.Forms.Label]@{
            Text = 'Pad Columns:';
            AutoSize = $true;
            Font = $Label.Font;
            Anchor = [System.Windows.Forms.AnchorStyles]::Right;
        }, 0, 2);
        if ($null -eq $PaddedColumnCount) {
            $Label = [System.Windows.Forms.Label]@{
                Text = '(blank for all)';
                AutoSize = $true;
                Anchor = [System.Windows.Forms.AnchorStyles]::Right;
            };
            $OuterTableLayoutPanel.Controls.Add($Label, 0, 3);
            $OuterTableLayoutPanel.SetColumnSpan($Label, 2);
            $RowIndex = 4;
        } else {
            $RowIndex = 3;
        }
        $StartTextBox = $null;
        $EndTextBox = $null;
        $PadToTextBox = $null;
        if ($null -eq $StartLineNumber) {
            $StartTextBox = [System.Windows.Forms.TextBox]@{
                Dock = [System.Windows.Forms.DockStyle]::Top;
                TabIndex = 1;
                Width = 64;
            };
            $OuterTableLayoutPanel.Controls.Add($StartTextBox, 1, 0);
        } else {
            $Label = [System.Windows.Forms.Label]@{
                AutoSize = $true;
                Anchor = [System.Windows.Forms.AnchorStyles]::Right;
            };
            if ($StartLineNumber -lt 1) {
                $Label.Text = '1';
            } else {
                $Label.Text = $StartLineNumber.ToString();
            }
            $OuterTableLayoutPanel.Controls.Add($Label, 1, 0);
        }
        if ($null -eq $EndLineNumber) {
            $TabIndex = 1;
            if ($null -ne $StartTextBox) { $TabIndex++ }
            $EndTextBox = [System.Windows.Forms.TextBox]@{
                Dock = [System.Windows.Forms.DockStyle]::Top;
                TabIndex = $TabIndex;
                Width = 64;
            };
            $OuterTableLayoutPanel.Controls.Add($EndTextBox, 1, 1);
        } else {
            $Label = [System.Windows.Forms.Label]@{
                AutoSize = $true;
                Anchor = [System.Windows.Forms.AnchorStyles]::Right;
            };
            if ($EndLineNumber -lt 1) {
                $Label.Text = '(end of file)';
            } else {
                $Label.Text = $EndLineNumber.ToString();
            }
            $OuterTableLayoutPanel.Controls.Add($Label, 1, 1);
        }
        if ($null -eq $PaddedColumnCount) {
            $RowIndex++;
            $TabIndex = 1;
            if ($null -ne $StartTextBox) { $TabIndex++ }
            if ($null -ne $EndTextBox) { $TabIndex++ }
            $PadToTextBox = [System.Windows.Forms.TextBox]@{
                Dock = [System.Windows.Forms.DockStyle]::Top;
                TabIndex = $TabIndex;
                Width = 64;
            };
            $OuterTableLayoutPanel.Controls.Add($PadToTextBox, 1, 2);
        } else {
            $Label = [System.Windows.Forms.Label]@{
                AutoSize = $true;
                Anchor = [System.Windows.Forms.AnchorStyles]::Right;
            };
            if ($PaddedColumnCount -lt 1) {
                $Label.Text = '(all)';
            } else {
                if ($PaddedColumnCount -eq 0) {
                    $Label.Text = '(none)';
                } else {
                    $Label.Text = $PaddedColumnCount.ToString();
                }
            }
            $OuterTableLayoutPanel.Controls.Add($Label, 1, 2);
        }
        $ButonsTableLayoutPanel = [System.Windows.Forms.TableLayoutPanel]@{
            Dock = [System.Windows.Forms.DockStyle]::Fill;
            AutoSize = $true;
            AutoSizeMode = [System.Windows.Forms.AutoSizeMode]::GrowOnly;
            ColumnCount = 2;
            RowCount = 1;
        };
        $ButonsTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::Percent, 1.0)) | Out-Null;
        $ButonsTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
        $ButonsTableLayoutPanel.RowStyles.Add([System.Windows.Forms.RowStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
        $TabIndex = 1;
        if ($null -ne $StartTextBox) { $TabIndex++ }
        if ($null -ne $EndTextBox) { $TabIndex++ }
        if ($null -ne $PadToTextBox) { $TabIndex++ }
        $HeadingNamesForm.AcceptButton.TabIndex = $TabIndex;
        $HeadingNamesForm.CancelButton.TabIndex = $TabIndex + 1;
        $ButonsTableLayoutPanel.Controls.Add($HeadingNamesForm.AcceptButton, 0, 0);
        $ButonsTableLayoutPanel.Controls.Add($HeadingNamesForm.CancelButton, 1, 0);
        $OuterTableLayoutPanel.Controls.Add($ButonsTableLayoutPanel, 0, $RowIndex);
        $OuterTableLayoutPanel.SetColumnSpan($ButonsTableLayoutPanel, 2);
        $LineNUmbersForm.Controls.Add($OuterTableLayoutPanel);
        if ($HeadingNamesForm.ShowDialog([WindowsHelper.WindowOwner]::new()) -ne [System.Windows.DialogResult]::OK) { return }
        if ($null -ne $StartTextBox) {
            $s = $StartTextBox.Text.Trim();
            if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$SkipLines) -and $SkipLines -gt 0))) {
                Write-Warning -Message 'Invalid start line number.';
                return;
            }
            $SkipLines--;
        }
        if ($null -ne $EndTextBox) {
            $s = $EndTextBox.Text.Trim();
            if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$LineCount) -and $LineCount -gt 0))) {
                Write-Warning -Message 'Invalid end line number.';
                return;
            }
            $LineCount -= $SkipLines;
            if ($LineCount -lt 1) {
                Write-Warning -Message 'Ending line number must be greater than the starting line number.';
                return;
            }
        }
    } else {
        $s = Read-Host -Prompt 'Start from line number (blank for first line of file)';
        if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$SkipLines) -and $SkipLines -gt 0))) {
            Write-Warning -Message 'Invalid start line number.';
            return;
        }
        $SkipLines--;
        $s = Read-Host -Prompt 'Last line number (blank for last line of file)';
        if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$LineCount) -and $LineCount -gt $SkipLines))) {
            Write-Warning -Message 'Invalid ending line number.';
            return;
        }
        $LineCount -= $SkipLines;
        if ($LineCount -lt 1) {
            Write-Warning -Message 'Ending line number must be greater than the starting line number.';
            return;
        }
        $s = Read-Host -Prompt 'Columns to pad (blank for all)';
        if (-not [string]::IsNullOrWhiteSpace($s)) {
            if (-not (([int]::TryParse($s.Trim(), [ref]$PadTo)) -and $PadTo -ge 0)) {
                Write-Warning -Message 'Invalid ending line number.';
                return;
            }
        }
    }
} else {
    if ($StartLineNumber -gt 1) { $SkipLines = $StartLineNumber - 1 }
    if ($EndLineNumber -gt 0) {
        $LineCount = $EndLineNumber - $SkipLines;
        if ($LineCount -lt 1) {
            Write-Warning -Message 'Ending line number must be greater than the starting line number.';
            return;
        }
    }
    if ($PaddedColumnCount -ge 0) { $PadTo = $PaddedColumnCount }
}

class HeaderCell {
    [string]$Text;
    [string]$Width;
}
$HeaderCells = [System.Collections.ObjectModel.Collection[HeaderCell]]::new();
if ($null -eq $FirstRowAsHeading -and ($null -eq $HeadingNames -or $HeadingNames.Length -eq 0)) {
    if ($UseWindowsPicker) {
        $TaskDialogPage = [System.Windows.Forms.TaskDialogPage]@{
            Caption = 'Heading Options';
            DefaultButton = [System.Windows.Forms.TaskDialogButton]::new('OK', $true, $true)
        };
        $TaskDialogPage.Buttons.Add($TaskDialogPage.DefaultButton);
        $TaskDialogPage.Buttons.Add([System.Windows.Forms.TaskDialogButton]::new('Cancel', $true, $true));
        $NoHeadersRadioButton = [System.Windows.Forms.TaskDialogRadioButton]::new('No headers');
        $UseFirstRowRadioButton = [System.Windows.Forms.TaskDialogRadioButton]::new('Use first row for headers');
        $TaskDialogPage.RadioButtons.Add($NoHeadersRadioButton);
        $TaskDialogPage.RadioButtons.Add($UseFirstRowRadioButton);
        $TaskDialogPage.RadioButtons.Add([System.Windows.Forms.TaskDialogRadioButton]::new('Manually enter headers'));
        $TaskDialogRadioButton.Checked = $true;
        $TaskDialogButton = $null;
        TaskDialogButton = [System.Windows.Forms.TaskDialog]::ShowDialog([WindowsHelper.WindowOwner]::new(), $TaskDialogPage, [System.Windows.Forms.TaskDialogStartupLocation]::CenterOwner);
        if (-not [object]::ReferenceEquals($TaskDialogPage.DefaultButton, $TaskDialogButton)) { return }
        if ($NoHeadersRadioButton.Checked) {
            $FirstRowAsHeading = $false;
        } else {
            if ($UseFirstRowRadioButton.Checked) { $FirstRowAsHeading = $true }
        }

        <#$DialogResult = [System.Windows.Forms.DialogResult]::No;
        $DialogResult = [System.Windows.Forms.MessageBox]::Show([WindowsHelper.WindowOwner]::new(), 'Specify Heading', 'Use first row as heading? (No to manually enter headings or Cancel for no headings)', [System.Windows.Forms.MessageBoxButtons]::YesNoCancel, 
            [System.Windows.Forms.MessageBoxIcon]::Warning,  [System.Windows.Forms.MessageBoxDefaultButton]::Button2);
        switch ($DialogResult) {
            Yes { $FirstRowAsHeading = $true; break; }
            No { break; }
            Cancel { $FirstRowAsHeading = $false; break;}
            Default { return }
        }#>
        if ($null -eq $FirstRowAsHeading) {
            $HeadingNamesForm = [System.Windows.Forms.Form]@{
                Text = 'Heading Names';
                AcceptButton = [System.Windows.Forms.Button]@{
                    Anchor = ([System.Windows.Forms.AnchorStyles]([System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Right));
                    Text = 'OK';
                    DialogResult = [System.Windows.Forms.DialogResult]::OK;
                    TabIndex = 2;
                };
                CancelButton = [System.Windows.Forms.Button]@{
                    Anchor = ([System.Windows.Forms.AnchorStyles]([System.Windows.Forms.AnchorStyles]::Bottom -bor [System.Windows.Forms.AnchorStyles]::Right));
                    Text = 'Cancel';
                    DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
                    TabIndex = 3;
                };
                TopMost = $true;
                Size = [System.Drawing.Size]::new(800, 600);
            }
            $OuterTableLayoutPanel = [System.Windows.Forms.TableLayoutPanel]@{
                Dock = [System.Windows.Forms.DockStyle]::Fill;
                AutoSize = $true;
                AutoSizeMode = [System.Windows.Forms.AutoSizeMode]::GrowAndShrink;
                ColumnCount = 2;
                RowCount = 3;
            }
            $OuterTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::Percent, 1.0)) | Out-Null;
            $OuterTableLayoutPanel.ColumnStyles.Add([System.Windows.Forms.ColumnStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
            $OuterTableLayoutPanel.RowStyles.Add([System.Windows.Forms.RowStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
            $OuterTableLayoutPanel.RowStyles.Add([System.Windows.Forms.RowStyle]::new([System.Windows.Forms.SizeType]::Percent, 1.0)) | Out-Null;
            $OuterTableLayoutPanel.RowStyles.Add([System.Windows.Forms.RowStyle]::new([System.Windows.Forms.SizeType]::AutoSize)) | Out-Null;
            $Label = [System.Windows.Forms.Label]@{
                Text = 'Enter header names, one per line:';
                AutoSize = $true;
                Anchor = ([System.Windows.Forms.AnchorStyles]([System.Windows.Forms.AnchorStyles]::Top -bor [System.Windows.Forms.AnchorStyles]::Left));
            }
            $OuterTableLayoutPanel.Controls.Add($Label, 0, 0);
            $OuterTableLayoutPanel.SetColumnSpan($Label, 2);
            $TextBox = [System.Windows.Forms.TextBox]@{
                Dock = [System.Windows.Forms.DockStyle]::Fill;
                AutoSize = $true;
                AcceptsReturn = $true;
                Multiline = $true;
                TabIndex = 1;
                WordWrap = $false;
                ScrollBars = [System.Windows.Forms.ScrollBars]::Both
            }
            $OuterTableLayoutPanel.Controls.Add($TextBox, 0, 1);
            $OuterTableLayoutPanel.SetColumnSpan($Label, 2);
            $OuterTableLayoutPanel.Controls.Add($HeadingNamesForm.AcceptButton, 0, 2);
            $OuterTableLayoutPanel.Controls.Add($HeadingNamesForm.CancelButton, 1, 2);
            $HeadingNamesForm.Controls.Add($OuterTableLayoutPanel);
            if ($HeadingNamesForm.ShowDialog([WindowsHelper.WindowOwner]::new()) -ne [System.Windows.DialogResult]::OK) { return }
            foreach ($n in $TextBox.Lines) {
                $t = $n;
                if ($null -eq $n) { $t = '' } else { $t = $t.Trim() }
                $HeaderCells.Add([HeaderCell]@{ Text = $t; Width = $t.Length });
            }
        }
    } else {
        $Choices = [System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]]::new();
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('Yes', 'Use first row for headers'));
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('No', 'No headers'));
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('Manual', 'Manually enter headers'));
        switch ($Host.UI.PromptForChoice('Table Header', 'Use first row as table header?', $Choices, 0)) {
            0 { $FirstRowAsHeading = $true; break; }
            1 { $FirstRowAsHeading = $false; break; }
            2 { break; }
            default { return }
        }

        'Specify columns - Enter blank line to end; enter a space for an empty header.' | Write-Host;
        $t = Read-Host -Prompt "Enter column $($HeaderCells.Count + 1) header";
        while (-not [string]::IsNullOrEmpty($t)) {
            $t = $t.Trim();
            $HeaderCells.Add([HeaderCell]@{ Text = $t; Width = $t.Length });
            $t = Read-Host -Prompt "Enter column $($HeaderCells.Count + 1) header";
        }
    }

} else {
    if (-not $FirstRowAsHeading) {
        foreach ($n in $HeadingNames) {
            $t = $n;
            if ($null -eq $n) { $t = '' } else { $t = $t.Trim() }
            $HeaderCells.Add([HeaderCell]@{ Text = $t; Width = $t.Length });
        }
    }
}

$StreamReader = $null;
$StreamReader = [System.IO.StreamReader]::new($InputFilePath);
if ($null -eq $StreamReader) {
    Write-Warning -Message 'Cannot read from file containing TSV data.';
    return;
}
try {
    $StreamWriter = $null;
    $StreamWriter = [System.IO.StreamWriter]::new($FileInfo.FullName, $false, [System.Text.UTF8Encoding]::new($false, $false));
    if ($null -eq $StreamWriter) {
        Write-Warning -Message 'Cannot create output file.';
        return;
    }
    try {
        for ($i = 0; $i -lt $SkipLines; $i++) {
            if ($StreamReader.EndOfStream) { break }
            $StreamReader.ReadLine() | Out-Null;
        }
        
        $Rows = [System.Collections.ObjectModel.Collection[string[]]]::new();
        while (($LineCount -lt 1 -or $Rows.Count -lt $LineCount) -and -not $StreamReader.EndOfStream) {
            [string[]]$Cells = ($StreamReader.ReadLine() -split '\t') | ForEach-Object { $_.Trim() }
            for ($i = 0; $i -lt $Cells.Length; $i++) {
                [HeaderCell]$h = $null;
                $n = $Cells[$i].Length;
                if ($i -lt $HeaderCells.Count) {
                    $h = $HeaderCells[$i];
                    if ($h.Width -lt $n) { $h.Width = $n }
                } else {
                    $HeaderCells.Add([HeaderCell]@{ Text = ''; Width = $Cells[$i].Length });
                }
            }
            $Rows.Add($Cells);
        }
        if ($PadTo -ge 0) {
            for ($i = $PadTo; $i -lt $HeaderCells.Count; $i++) {
                $HeaderCells[$i].Width = -1;
            }
        }
        if ($null -ne $FirstRowAsHeading -and $FirstRowAsHeading -and $Rows.Count -gt 0) {
            $Cells = $Rows[0];
            for ($i = 0; $i -lt $Cells.Count; $i++) {
                $HeaderCells[$i].Text = $Cells[$i]
            }
            $Rows.RemoveAt(0);
        }
        if (@($HeaderCells | Where-Object { $_.Text.Length -gt 0 }).Count -gt 0) {
            $Widths = [System.Collections.ObjectModel.Collection[int]]::new();
            foreach ($h in $HeaderCells) {
                $StreamWriter.Write('| ');
                $p = $h.Width;
                if ($h.Text.Length -gt 0) {
                    $StreamWriter.Write($h.Text);
                    $w = $h.Text.Length;
                    if ($p -ge 0) { $p = $w - $p + 1 }
                    if ($p -gt 1) {
                        $Widths.Add($p + 1);
                        $StreamWriter.Write([string]::new(([char]' '), $p));
                    } else {
                        if ($w -gt 0) { $Widths.Add($w + 2) } else { $Widths.Add(1) }
                        $StreamWriter.Write(' ');
                    }
                } else {
                    if ($p -ge 0) {
                        $Widths.Add($p + 2);
                        $StreamWriter.Write([string]::new(([char]' '), $p + 1));
                    } else {
                        $Widths.Add(1);
                    }
                }
            }
            $StreamWriter.WriteLine('| ');
            $Widths | ForEach-Object { 
                $StreamWriter.Write('|');
                $StreamWriter.Write([string]::new(([char]'-'), $_));
            }
            $StreamWriter.WriteLine('| ');
        }
        foreach ($Cells in $Rows) {
            for ($i = 0; $i -lt $HeaderCells.Count; $i++) {
                $StreamWriter.Write('| ');
                $w = $HeaderCells[$i].Width;
                if ($i -lt $Cells.Length) {
                    $t = $Cells[$i];
                    $StreamWriter.Write($t);
                    $w = $w - $t.Length + 1;
                    if ($w -gt 0) {
                        $StreamWriter.Write([string]::new(([char]' '), $w + 1));
                    }
                } else {
                    if ($w -gt 0) {
                        $StreamWriter.Write([string]::new(([char]' '), $w + 1));
                    }
                }
            }
            $StreamWriter.WriteLine('|');
        }
        $StreamWriter.Flush();
        if ($HasHeader) {
            Write-Information -MessageData "Wrote $($Rows.Count + 1) lines to $($FileInfo.FullName).";
        } else {
            Write-Information -MessageData "Wrote $($Rows.Count) lines to $($FileInfo.FullName).";
        }
    } finally {
        $StreamWriter.Close();
    }
} finally {
    $StreamReader.Close();
}
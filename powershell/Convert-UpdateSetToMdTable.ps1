Param(
    # True to use windows dialog boxes; otherwise false to use powershell host prompts.
    [bool]$UseWindowsPicker = $false,

    # Whether to pad non-comment cells to width of widest cell in each column.
    [bool]$PadNonCommentCells = $false,

    # Path to initial directory for file pickers. If this is null or empty, then the parent directory of $PSScriptRoot is used.
    [string]$InitialDirectory
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
        DefaultExt = '.xml';
        DereferenceLinks = $true;
        Filter = 'XML Files (*.xml)|*.xml|All Files (*.*)|*.*';
        InitialDirectory = $InitialDirectory;
        RestoreDirectory = $true;
        Title = 'Select Update Set XML file';
    };
    $DialogResult = [System.Windows.Forms.DialogResult]::Cancel;
    $DialogResult = $OpenFileDialog.ShowDialog([WindowsHelper.WindowOwner]::new());
    if ($DialogResult -ne [System.Windows.Forms.DialogResult]::OK) { return }
    $InputFilePath = $OpenFileDialog.FileName;
} else {
    $InputFilePath = Read-Host -Prompt 'Update Set XML file path';
    if ([string]::IsNullOrWhiteSpace($InputFilePath)) { return }
    if (-not [System.IO.File]::Exists($InputFilePath)) {
        Write-Warning -Message 'Update Set XML file not found.';
        return;
    }
}
class SnUpdate : System.IComparable {
    [long]$TimeStamp;
    [long]$Increment;
    [datetime]$CreatedOn;
    [string]$Name;
    [string]$Type;
    [string]$Table;
    [string]$TargetName;
    [string]$Comments;
    [string]$SysId;
    [System.Xml.XmlElement]$Element;

    SnUpdate([System.Xml.XmlElement]$Element) {
        $this.Element = $Element;
        $e = $Element.SelectSingleNode('sys_created_on');
        if ($null -ne $e -and -not $e.IsEmpty) {
            $d = [datetime]::Now;
            if ([datetime]::TryParse($e.InnerText.Trim(), [ref]$d)) { $this.CreatedOn = $d }
        }
        $e = $Element.SelectSingleNode('recorded_at');
        if ($null -ne $e -and -not $e.IsEmpty) {
            [long]$l = 0;
            $t = $e.InnerText.Trim();
            if ($t.Length -gt 10 -and [long]::TryParse($t.Substring(0, 11), [System.Globalization.NumberStyles]::HexNumber, [ref]$l)) { $this.TimeStamp = $l }
            if ($t.Length -gt 11 -and [long]::TryParse($t.Substring(11), [System.Globalization.NumberStyles]::HexNumber, [ref]$l)) { $this.Increment = $l }
        }
        $e = $Element.SelectSingleNode('name');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.Name = $e.InnerText.Trim() } else { $this.Name = '' }
        $e = $Element.SelectSingleNode('type');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.Type = $e.InnerText.Trim() } else { $this.Type = '' }
        $e = $Element.SelectSingleNode('table');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.Table = $e.InnerText.Trim() } else { $this.Table = '' }
        $e = $Element.SelectSingleNode('target_name');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.TargetName = $e.InnerText.Trim() } else { $this.TargetName = '' }
        $e = $Element.SelectSingleNode('comments');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.Comments = $e.InnerText.Trim() } else { $this.Comments = '' }
        $e = $Element.SelectSingleNode('sys_id');
        if ($null -ne $e -and -not $e.IsEmpty) { $this.SysId = $e.InnerText.Trim() } else { $this.Comments = '' }
    }

    [int] CompareTo([object] $obj)
    {
        if ($obj -is [SnUpdate]) {
            $i = $this.TimeStamp.CompareTo($obj.TimeStamp);
            if ($i -eq 0 -and ($i = $this.TimeStamp.CompareTo($obj.TimeStamp))) { $this.CreatedOn.CompareTo($obj.CreatedOn) }
            return $i;
        }
        return -1;
    }
}

class HeaderCell {
    [string]$Text;
    [int]$Width;
    [scriptblock]$GetText;
}

$FileInfo = $null;
$FileInfo = [System.IO.FileInfo]::new($InputFilePath);
if ($null -eq $FileInfo) {
    Write-Warning -Message 'Cannot validate Update Set XML file path.';
    return;
}
$InputFilePath = $FileInfo.FullName;
if ([string]::IsNullOrWhiteSpace($InputFilePath)) { return }
$UpdateSetXml = [Xml]::new();
$UpdateSetXml.Load($InputFilePath);
$sys_remote_update_set = $UpdateSetXml.DocumentElement;
if ($null -eq $sys_remote_update_set) {
    Write-Warning -Message 'Cannot read from Update Set XML file or path does not refer to an XML file.';
    return;
}
if ($sys_remote_update_set.LocalName -cne 'unload' -or $sys_remote_update_set.NamespaceURI -ne '' -or $null -eq ($sys_remote_update_set = $sys_remote_update_set.SelectSingleNode('sys_remote_update_set')) -or $sys_remote_update_set.LocalName -cne 'sys_remote_update_set') {
    Write-Warning -Message 'Not an update set file.';
    return;
}
$OutputFilePath = '';
if ($UseWindowsPicker) {
    $SaveFileDialog = [System.Windows.Forms.SaveFileDialog]@{
        AddExtension = $true;
        CheckPathExists = $true;
        DefaultExt = '.xml';
        DereferenceLinks = $true;
        Filter = 'Markdown Files (*.md)|*.md|All Files (*.*)|*.*';
        InitialDirectory = $InitialDirectory;
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
    Write-Warning -Message 'Cannot validate output file path.';
    return;
}
if (-not $UseWindowsPicker) {
    if ($FileInfo.Exists) {
        $Choices = [System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]]::new();
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('Yes'));
        $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('No'));
        if ($Host.UI.PromptForChoice('Confirm Overwrite', 'Output file already exists. Overwrite?', $Choices, 1) -ne 0) { return }
    } else {
        if (-not $FileInfo.Directory.Exists) {
            Write-Warning -Message 'Parent directory of output path does not exist.';
            return;
        }
    }
}
[SnUpdate[]]$Updates = @($UpdateSetXml.DocumentElement.SelectNodes('sys_update_xml') | ForEach-Object { [SnUpdate]::new($_) } | Sort-Object);
$StreamWriter = $null;
$StreamWriter = [System.IO.StreamWriter]::new($FileInfo.FullName, $false, [System.Text.UTF8Encoding]::new($false, $false));
if ($null -eq $StreamWriter) {
    Write-Warning -Message 'Cannot create output file.';
    return;
}
try {
    $StreamWriter.Write("# ");
    $StreamWriter.WriteLine($sys_remote_update_set.name);
    $StreamWriter.WriteLine('');
    $StreamWriter.Write("- **Scope:** ");
    $StreamWriter.WriteLine($sys_remote_update_set.application_scope);
    $StreamWriter.Write("- **Release Date:** ");
    $StreamWriter.WriteLine($sys_remote_update_set.release_date);
    $StreamWriter.Write("- **Description:** ");
    $StreamWriter.WriteLine($sys_remote_update_set.description);
    $StreamWriter.Write("- **Application Name:** ");
    $StreamWriter.WriteLine($sys_remote_update_set.application_name);
    if (-not [string]::IsNullOrWhiteSpace($sys_remote_update_set.application_version)) {
        $StreamWriter.Write("- **Application Version:** ");
        $StreamWriter.WriteLine($sys_remote_update_set.application_version);
    }

    $StreamWriter.WriteLine('');
    [HeaderCell[]]$Columns = @(
        [HeaderCell]@{ Text = 'Name'; Width = 4; GetText = { return $args[0].Name } }
        [HeaderCell]@{ Text = '**Type** / Table'; Width = 16; GetText = {
            if ($args[0].Type.Length -gt 0) {
                if ($args[0].Table.Length -gt 0) {
                    return "**$($args[0].Type)** / $($args[0].Table)";
                }
                return "**$($args[0].Type)**";
            }
            if ($args[0].Table.Length -gt 0) {
                return "/ $($args[0].Table)";
            }
            return "";
        } }
        [HeaderCell]@{ Text = 'Target'; Width = 6; GetText = { return $args[0].TargetName } }
        [HeaderCell]@{ Text = 'Comments'; Width = 0; GetText = { return $args[0].Comments } }
    );
    Write-Debug -Message ($Columns | Out-String);
    $Rows = [System.Collections.ObjectModel.Collection[System.Collections.ObjectModel.Collection[string]]]::new();
    if ($PadNonCommentCells) {
        foreach ($u in $Updates) {
            $Cells = [System.Collections.ObjectModel.Collection[string]]::new();
            $Columns | ForEach-Object {
                $t = $_.GetText.Invoke($u);
                $Cells.Add($t);
                if ($_.Width -gt 0 -and $t.Length -gt $_.Width) {
                    Write-Debug -Message "Updating heading `"$($_.Text)`" length from $($_.Width) to $($t.Length)";
                    $_.Width = $t.Length;
                }
            }
            $Rows.Add($Cells);
        }
        Write-Debug -Message 'Calculated widths';
        Write-Debug -Message ($Columns | Out-String);
    } else {
        $Columns | ForEach-Object { $_.Width = 0 }
        foreach ($u in $Updates) {
            $Cells = [System.Collections.ObjectModel.Collection[string]]::new();
            $Columns | ForEach-Object {
                $t = $_.GetText.Invoke($u);
                $Cells.Add($t);
            }
            $Rows.Add($Cells);
        }
    }
    $Columns | ForEach-Object {
        $StreamWriter.Write('| ');
        Write-Debug -Message "Writing heading `"$($_.Text)`"" ;
        $StreamWriter.Write($_.Text);
        if ($_.Width -gt 0) {
            Write-Debug -Message "Writing (Width:$($_.Width) - Text.Length:$($_.Text.Length) + 1 = $($_.Width - $_.Text.Length + 1)) padding characters";
            $StreamWriter.Write([string]::new(([char]' '), $_.Width - $_.Text.Length + 1));
        } else {
            Write-Debug -Message 'Writing single padding character';
            $StreamWriter.Write(' ');
        }
    }
    $StreamWriter.WriteLine('|');
    $Columns | ForEach-Object {
        $StreamWriter.Write('|');
        if ($_.Width -gt 0) {
            Write-Debug -Message "Writing heading $($_.Width + 2) separator characters for `"$($_.Text)`": Width = $($_.Width)";
            $StreamWriter.Write([string]::new(([char]'-'), $_.Width + 2));
        } else {
            Write-Debug -Message "Writing heading $($_.Text.Length + 2) separator characters for `"$($_.Text)`": Width = $($_.Width)";
            $StreamWriter.Write([string]::new(([char]'-'), $_.Text.Length + 2));
        }
    }
    $StreamWriter.WriteLine('|');
    $Enumerator = $Rows.GetEnumerator();
    while ($Enumerator.MoveNext()) {
        $Cells = $Enumerator.Current;
        for ($i = 0; $i -lt $Cells.Count; $i++) {
            $t = $Cells[$i];
            $c = $Columns[$i];
            $StreamWriter.Write('| ');
            if ($t.Length -gt 0) {
                $StreamWriter.Write($t);
                if ($c.Width -gt 0) {
                    $StreamWriter.Write([string]::new(([char]' '), $c.Width - $t.Length + 1));
                } else {
                    $StreamWriter.Write(' ');
                }
            } else {
                if ($c.Width -gt 0) {
                    $StreamWriter.Write([string]::new(([char]' '), $c.Width + 1));
                }
            }
        }
        $StreamWriter.WriteLine('|');
    }
    $StreamWriter.Flush();
} finally {
    $StreamWriter.Close();
}
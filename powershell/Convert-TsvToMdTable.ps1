$InputFilePath = Read-Host -Prompt 'Input File Path';
$FileInfo = $null;
$FileInfo = [System.IO.FileInfo]::new($InputFilePath);
if ($null -eq $FileInfo) {
    Write-Warning -Message 'Cannot validate input file path.';
    return;
}
$InputFilePath = $FileInfo.FullName;
if ([string]::IsNullOrWhiteSpace($InputFilePath)) { return }
if (-not [System.IO.File]::Exists($InputFilePath)) {
    Write-Warning -Message 'Input file not found.';
    return;
}
$StreamReader = $null;
$StreamReader = [System.IO.StreamReader]::new($InputFilePath);
if ($null -eq $StreamReader) {
    Write-Warning -Message 'Cannot read from input file.';
    return;
}
try {
    $OutputFilePath = Read-Host -Prompt 'Output File Name';
    if ([string]::IsNullOrWhiteSpace($OutputFilePath)) { return }
    if (-not [System.IO.Path]::IsPathRooted($OutputFilePath)) { $OutputFilePath = [System.IO.Path]::Combine($FileInfo.DirectoryName, $OutputFilePath) }
    $FileInfo = $null;
    $FileInfo = [System.IO.FileInfo]::new($OutputFilePath);
    if ($null -eq $FileInfo) {
        Write-Warning -Message 'Cannot validate output file path.';
        return;
    }
    $Choices = [System.Collections.ObjectModel.Collection[System.Management.Automation.Host.ChoiceDescription]]::new();
    $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('Yes'));
    $Choices.Add([System.Management.Automation.Host.ChoiceDescription]::new('No'));
    if ($FileInfo.Exists) {
        if ($Host.UI.PromptForChoice('Confirm Overwrite', 'Output file already exists. Overwrite?', $Choices, 1) -ne 0) { return }
    } else {
        if (-not $FileInfo.Directory.Exists) {
            Write-Warning -Message 'Parent directory of output path does not exist.';
            return;
        }
    }
    $HasHeader = $Host.UI.PromptForChoice('Table Header', 'Use first row as table header?', $Choices, 0) -eq 0;
    $StreamWriter = $null;
    $StreamWriter = [System.IO.StreamWriter]::new($FileInfo.FullName, $false, [System.Text.UTF8Encoding]::new($false, $false));
    if ($null -eq $StreamWriter) {
        Write-Warning -Message 'Cannot create output file.';
        return;
    }
    $s = Read-Host -Prompt 'Start from line number (blank for first line of file)';
    $SkipLines = 1;
    if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$SkipLines) -and $SkipLines -gt 0))) {
        Write-Warning -Message 'Invalid start line number.';
        return;
    }
    $SkipLines--;
    $s = Read-Host -Prompt 'Last line number (blank for last line of file)';
    $LineCount = [int]::MaxValue;
    if (-not ([string]::IsNullOrWhiteSpace($s) -or ([int]::TryParse($s.Trim(), [ref]$LineCount) -and $LineCount -gt $SkipLines))) {
        Write-Warning -Message 'Invalid ending line number.';
        return;
    }
    if ($LineCount -lt [int]::MaxValue) { $LineCount = $LineCount - $SkipLines }
    try {
        $Rows = [System.Collections.ObjectModel.Collection[string[]]]::new();
        $CellWidths = [System.Collections.ObjectModel.Collection[int]]::new();
        for ($i = 0; $i -lt $SkipLines; $i++) {
            if ($StreamReader.EndOfStream) { break }
            $StreamReader.ReadLine() | Out-Null;
        }
        while ($Rows.Count -lt $LineCount -and -not $StreamReader.EndOfStream) {
            [string[]]$Cells = ($StreamReader.ReadLine() -split '\t') | ForEach-Object { $_.Trim() }
            for ($i = 0; $i -lt $Cells.Length; $i++) {
                $n = $Cells[$i].Length;
                if ($i -eq $CellWidths.Count) {
                    $CellWidths.Add($n);
                } else {
                    if ($CellWidths[$i] -lt $n) { $CellWidths[$i] = $n }
                }
            }
            $Rows.Add($Cells);
        }
        if ($HasHeader) {
            $Cells = $Rows[0];
            for ($i = 0; $i -lt $CellWidths.Count; $i++) {
                $StreamWriter.Write('| ');
                if ($i -lt $Cells.Length) {
                    $t = $Cells[$i];
                    $StreamWriter.Write($t);
                    $StreamWriter.Write([string]::new(([char]' '), $CellWidths[$i] - $t.Length + 1));
                } else {
                    $StreamWriter.Write([string]::new(([char]' '), $CellWidths[$i] + 1));
                }
            }
            $StreamWriter.WriteLine('|');
            for ($i = 0; $i -lt $CellWidths.Count; $i++) {
                $StreamWriter.Write('|');
                $StreamWriter.Write([string]::new(([char]'-'), $CellWidths[$i] + 2));
            }
            $StreamWriter.WriteLine('|');
            $Rows.RemoveAt(0);
        }
        foreach ($Cells in $Rows) {
            for ($i = 0; $i -lt $CellWidths.Count; $i++) {
                $StreamWriter.Write('| ');
                if ($i -lt $Cells.Length) {
                    $t = $Cells[$i];
                    $StreamWriter.Write($t);
                    $StreamWriter.Write([string]::new(([char]' '), $CellWidths[$i] - $t.Length + 1));
                } else {
                    $StreamWriter.Write([string]::new(([char]' '), $CellWidths[$i] + 1));
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
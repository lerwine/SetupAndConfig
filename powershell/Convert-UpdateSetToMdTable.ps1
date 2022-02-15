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
$UpdateSetXml = [Xml]::new();
$UpdateSetXml.Load($InputFilePath);
$sys_remote_update_set = $UpdateSetXml.DocumentElement;
if ($null -eq $sys_remote_update_set) {
    Write-Warning -Message 'Cannot read from input file or path does not refer to an XML file.';
    return;
}
if ($sys_remote_update_set.LocalName -cne 'unload' -or $sys_remote_update_set.NamespaceURI -ne '' -or $null -eq ($sys_remote_update_set = $sys_remote_update_set.SelectSingleNode('sys_remote_update_set')) -or $sys_remote_update_set.LocalName -cne 'sys_remote_update_set') {
    Write-Warning -Message 'Not an update set file.';
    return;
}
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
    $Columns = @(
        @{heading = 'Name'; names = @('name') },
        @{heading = '**Type** / Table'; names = @('type', 'table') },
        @{heading = 'Target'; names = @('target_name') },
        @{heading = 'Comments'; names = @('comments') }
    );
    $Rows = [System.Collections.ObjectModel.Collection[System.Collections.ObjectModel.Collection[string]]]::new();
    $Columns | ForEach-Object { $_['width'] = $_['heading'].Length }
    foreach ($UpdateElement in @($UpdateSetXml.DocumentElement.SelectNodes('sys_update_xml'))) {
        $Cells = [System.Collections.ObjectModel.Collection[string]]::new();
        $Columns | ForEach-Object {
            $v = @($_['names'] | ForEach-Object {
                $e = $UpdateElement.SelectSingleNode($_);
                if ($null -eq $e -or $e.IsEmpty) { '' } else { $e.InnerText.Trim() }
            });
            $t = '';
            if ($_['names'] -contains 'type') {
                if ($v.Count -eq 1 -or ($v.Count -gt 1 -and $v[1].Length -eq 0)) {
                    if ($v[0].Length -gt 0) { $t = "**$($v[0])**" }
                } else { 
                    if ($v.Count -gt 0) {
                        if ($v[0].Length -gt 0) {
                            $t = "**$($v[0])** / $($v[1])"
                        } else {
                            $t = "/ $($v[1])"
                        }
                    }
                }
            } else {
                if ($v.Count -gt 0) { $t = @($v | Where-Object { $_.Length -gt 0 }) -join ' / ' }
            }
            if ($_['names'] -notcontains 'comments' -and $t.Length -gt $_['width']) { $_['width'] = $t.Length }
            $Cells.Add($t);
        }
        $Rows.Add($Cells);
    }
    $StreamWriter.Write('|');
    $Columns | ForEach-Object {
        $StreamWriter.Write(' ');
        $StreamWriter.Write($_['heading']);
        $n = $_['width'];
        $d = $n - $_.heading.Length;
        if ($d -gt 0) { $StreamWriter.Write([string]::new(([char]' '), $d)) }
        $StreamWriter.Write(' |');
    }
    $StreamWriter.WriteLine('');
    $StreamWriter.Write('|');
    $Columns | ForEach-Object {
        $StreamWriter.Write([string]::new(([char]'-'), $_['width'] + 2));
        $StreamWriter.Write('|');
    }
    $StreamWriter.WriteLine('');
    $Enumerator = $Rows.GetEnumerator();
    while ($Enumerator.MoveNext()) {
        $StreamWriter.Write('|');
        $Cells = $Enumerator.Current;
        for ($i = 0; $i -lt $Columns.Count; $i++) {
            $c = $Columns[$i];
            $t = $Cells[$i];
            $StreamWriter.Write(' ');
            $StreamWriter.Write($t);
            $d = $c['width'] - $t.Length;
            if ($d -gt 0) { $StreamWriter.Write([string]::new(([char]' '), $d)) }
            $StreamWriter.Write(' |');
        }
        $StreamWriter.WriteLine('');
    }
} finally {
    $StreamWriter.Close();
}
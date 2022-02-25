<#
$Script:GroupRegex = [System.Text.RegularExpressions.Regex]::new('(?>(?>(?''open''(?!\\)\()(\\.|[^\\()]+)*)+(?>(?''-open''(?!\\)\))(\\.|[^\\()]+)*)+)+?(?(open)(?!))');
$Script:GroupTypeRegex = [System.Text.RegularExpressions.Regex]::new('^\?(-?[ixsmn])*(<[=!]|[:>|!=]|(<\w+>|''\w+''))?');
$Script:CharClassRegex = [System.Text.RegularExpressions.Regex]::new('((?!\\)\[(\\.|[^\]\\]+)*\])+');
$Script:SymbolRegex = [System.Text.RegularExpressions.Regex]::new('(\\[AZBb]|(?!\\)[.^$|*?+]+)+');
$Script:EscapedRegex = [System.Text.RegularExpressions.Regex]::new('(\\(?!(0?[0-7]{3}|[\\tRrnaefdvAZBbwSs]|c[A-Z])|u[\da-fA-F]{4}|x[\da-fA-F]{2}|[Pp]\{[^\s{}]\}|(?<b>-?d+|k(<\w+>|''\w+''))).)+');
$Script:BackRefRegex = [System.Text.RegularExpressions.Regex]::new('(\\(-?\d+|k(<\w+>|''\w+'')))+');
$Script:SpecialCharRegex = [System.Text.RegularExpressions.Regex]::new('(\\(0?[0-7]{3}|[\\tRrnaefvDdwSs]|c[A-Z])|u[\da-fA-F]{4}|x[\da-fA-F]{2}|[Pp]\{[^\s{}]\}))+');
#>

enum RegexTokenType {
    WhiteSpace;
    Literal;
    Anchor;
    Alternation;
    Quantifier;
    EscapedMeta;
    AnyChar;
    CharClass;
    Boundary;
    CharEscape;
    BackReference;
    Group;
}

class RegexTokenItem {
    [ValidateNotNullOrEmpty()] [string]$Pattern;
    [RegexTokenType]$Type;
    [ValidateRange(0, [int]::MaxValue)] [int]$GroupingDepth;
    RegexTokenItem([RegexTokenBuilder]$Builder) {
        $this.Pattern = $Builder.Pattern.ToString();
        $this.Type = $Builder.Type;
        $this.GroupingDepth = $Builder.GroupingDepth;
    }
}

class RegexTokenBuilder {
    [System.Text.StringBuilder]$Pattern;
    [RegexTokenType]$Type;
    [int]$GroupingDepth;
    RegexTokenBuilder([string]$Pattern, [RegexTokenType]$Type, [int]$GroupingDepth) {
        $this.Pattern = [System.Text.StringBuilder]::new($Pattern);
        $this.Type = $Type;
        $this.GroupingDepth = $GroupingDepth;
    }
}

class RegexTokenWriter {
    hidden [RegexTokenBuilder]$Current;
    hidden [RegexTokenBuilder]$RecentClosed;
    hidden [int]$GroupingDepth = 0;
    hidden [System.Collections.ObjectModel.Collection[RegexTokenItem]]$ParsedTokens = [System.Collections.ObjectModel.Collection[RegexTokenItem]]::new();

    [RegexTokenType] GetCurrentType() {
        if ($null -eq $this.Current) {
            if ($null -eq $this.RecentClosed) { return [RegexTokenType]::Literal }
            return $this.RecentClosed.Type;
        }
        return $this.Current.Type;
    }

    [bool] Write([string]$Pattern, [RegexTokenType]$Type) {
        if ([string]::IsNullOrEmpty($Pattern)) { return $false }
        switch ($Type) {
            Group {
                switch ($Pattern[0]) {
                    '(' {
                        $this.GroupingDepth++;
                        if ($null -eq $this.Current) {
                            if ($null -ne $this.RecentClosed) {
                                if ($this.RecentClosed.GroupingDepth -eq $this.GroupingDepth -and $this.RecentClosed.Type -eq $Type) {
                                    ($this.Current = $this.RecentClosed).Pattern.Append($Pattern);
                                    $this.RecentClosed = $null;
                                    return $false;
                                }
                                $this.RecentClosed = $null;
                                $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed));
                                $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, $this.GroupingDepth);
                            } else {
                                $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, $this.GroupingDepth);
                            }
                        } else {
                            $this.ParsedTokens.Add([RegexTokenItem]::new($this.Current));
                            $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, $this.GroupingDepth);
                        }
                        break;
                    }
                    ')' {
                        if ($Pattern.Length -ne 1) { throw '$Type is Group with a closing $Pattern but more than 1 character.' }
                        if ($null -eq $this.Current) {
                            if ($null -ne $this.RecentClosed) { $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed)) }
                            $this.RecentClosed = [RegexTokenBuilder]::new($Pattern, $Type, $this.GroupingDepth);
                        } else {
                            if ($this.Current.GroupingDepth -eq $this.GroupingDepth -and $this.Current.Type -eq $Type) {
                                ($this.RecentClosed = $this.Current).Pattern.Append($Pattern);
                                $this.GroupingDepth--;
                                $this.Current = $null;
                                return $false;
                            }
                            $this.RecentClosed = [RegexTokenBuilder]::new($Pattern, $Type, $this.GroupingDepth);
                            $this.Current = $null;
                        }
                        $this.GroupingDepth--;
                        break;
                    }
                    Default {
                        throw '$Type is Group and $Pattern does not start with ''('' or equal '')''';
                    }
                }
                break;
            }
            CharClass {
                switch ($Pattern[0]) {
                    '[' {
                        if ($null -eq $this.Current) {
                            if ($null -ne $this.RecentClosed) {
                                if ($this.RecentClosed.Type -eq $Type) {
                                    ($this.Current = $this.RecentClosed).Pattern.Append($Pattern);
                                    $this.RecentClosed = $null;
                                    return $false;
                                }
                                $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed));
                                $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                                $this.RecentClosed = $null;
                            } else {
                                $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                            }
                        } else {
                            $this.ParsedTokens.Add([RegexTokenItem]::new($this.Current));
                            $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                        }
                        break;
                    }
                    ']' {
                        if ($Pattern.Length -ne 1) { throw '$Type is CharClass with a closing $Pattern but more than 1 character.' }
                        if ($null -eq $this.Current) {
                            if ($null -ne $this.RecentClosed) { $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed)) }
                            $this.RecentClosed = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                        } else {
                            if ($this.Current.Type -eq $Type) {
                                ($this.RecentClosed = $this.Current).Pattern.Append($Pattern);
                                $this.Current = $null;
                                return $false;
                            }
                            $this.RecentClosed = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                            $this.Current = $null;
                        }
                        break;
                    }
                    Default {
                        throw '$Type is CharClass and $Pattern does not start with ''['' or equal '']''';
                    }
                }
                break;
            }
            Default {
                if ($null -eq $this.Current) {
                    if ($null -ne $this.RecentClosed) {
                        $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed));
                        $this.RecentClosed = $null;
                    }
                    $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                } else {
                    if ($this.Current.Type -eq $Type) {
                        $this.Current.Pattern.Append($Pattern);
                        return $false;
                    }
                    $this.ParsedTokens.Add([RegexTokenItem]::new($this.Current));
                    $this.Current = [RegexTokenBuilder]::new($Pattern, $Type, 0);
                }
                break;
            }
        }
        return $true;
    }

    [System.Collections.ObjectModel.Collection[RegexTokenItem]] GetTokens([bool]$Force) {
        if (-not ($Force -or $this.GroupingDepth -eq 0)) { throw "$($this.GroupingDepth) group(s) have not been closed" }
        if ($null -ne $this.Current) {
            $this.ParsedTokens.Add([RegexTokenItem]::new($this.Current));
            $this.Current = $null;
        } else {
            if ($null -ne $this.RecentClosed) {
                $this.ParsedTokens.Add([RegexTokenItem]::new($this.RecentClosed));
                $this.RecentClosed = $null;
            }
        }
        $Result = $this.ParsedTokens;
        $this.ParsedTokens = [System.Collections.ObjectModel.Collection[RegexTokenItem]]::new();
        $this.GroupingDepth = 0;
        return $Result;
    }
}

class PatternSource {
    hidden [string]$Pattern;
    hidden [int]$StartAt = 0;
    hidden [PatternSource]$NestedSource;

    PatternSource([string]$Pattern) {
        if ($null -eq $Pattern) { $this.Pattern = '' } else { $this.Pattern = $Pattern }
    }

    [bool] IsEndOfPattern() { return $this.CheckNestedSource() -and $this.StartAt -eq $this.Pattern.Length }

    [int] GetCurrentPosition() {
        if ($this.CheckNestedSource()) { return $this.StartAt }
        return $this.StartAt + $this.NestedSource.GetCurrentPosition();
    }

    [int] GetLength() { return $this.Pattern.Length - $this.GetCurrentPosition() }
    
    [bool] CheckNestedSource() {
        if ($null -ne $this.NestedSource) {
            if (-not $this.NestedSource.IsEndOfPattern()) { return $false }
            $this.StartAt += $this.NestedSource.Pattern.Length;
            $this.NestedSource = $null;
        }
        return $true;
    }
    
    [System.Text.RegularExpressions.Match] Match([System.Text.RegularExpressions.Regex]$Regex) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($null -ne $Regex -and $this.StartAt -lt $this.Pattern.Length) { return $Regex.Match($this.Pattern, $this.StartAt) }
        return [System.Text.RegularExpressions.Match]::Empty;
    }

    [System.Text.RegularExpressions.Match] Match([System.Text.RegularExpressions.Regex]$Regex, [int]$Offset) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($Offset -lt 1) { $Offset = $this.StartAt } else { $Offset += $this.StartAt }
        if ($null -ne $Regex -and $Offset -lt $this.Pattern.Length) { return $Regex.Match($this.Pattern, $Offset) }
        return [System.Text.RegularExpressions.Match]::Empty;
    }

    [bool] IsMatch([System.Text.RegularExpressions.Regex]$Regex) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        return $null -ne $Regex -and $this.StartAt -lt $this.Pattern.Length -and  $Regex.IsMatch($this.Pattern, $this.StartAt);
    }

    [System.Text.RegularExpressions.Match[]] Matches([System.Text.RegularExpressions.Regex]$Regex) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($null -ne $Regex -and $this.StartAt -lt $this.Pattern.Length) { return @($Regex.Matches($this.Pattern, $this.StartAt)) }
        return @();
    }
    
    [void] SetCurrentPosition([System.Text.RegularExpressions.Match]$Match) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($null -eq $Match -or -not $Match.Success) { return }
        if ($this.StartAt -eq $Match.Index) {
            $NextStartAt = $Match.Index + $Match.Length;
            if ($NextStartAt -le $this.Pattern.Length -and $this.Pattern.Substring($this.StartAt, $Match.Length) -ceq $Match.Value) {
                $this.StartAt = $NextStartAt;
                return;
            }
        }
        throw '$Match is not part of pattern source';
    }
    
    [string] Read([int]$Length) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($Length -lt 1 -or $this.StartAt -eq $this.Pattern.Length) { return '' }
        $PreviousStartAt = $this.StartAt;
        $this.StartAt += $Length;
        if ($this.StartAt -ge $this.Pattern.Length) {
            $this.StartAt = $this.Pattern.Length;
            return $this.Pattern.Substring($PreviousStartAt);
        }
        return $this.Pattern.Substring($PreviousStartAt, $Length);
    }
    
    [string] ReadToEnd() {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($this.StartAt -eq $this.Pattern.Length) { return '' }
        $PreviousStartAt = $this.StartAt;
        $this.StartAt = $this.Pattern.Length;
        return $this.Pattern.Substring($PreviousStartAt);
    }
    
    [PatternSource] CreateNestedSource([System.Text.RegularExpressions.Match]$Match) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($null -eq $Match -or -not $Match.Success) { return [PatternSource]::new('') }
        if ($this.StartAt -eq $Match.Index) {
            $NextStartAt = $Match.Index + $Match.Length;
            if ($NextStartAt -le $this.Pattern.Length -and $this.Pattern.Substring($this.StartAt, $Match.Length) -ceq $Match.Value) {
                $this.NestedSource = [PatternSource]::new($Match.Value);
                return $this.NestedSource;
            }
        }
        throw '$Match is not part of pattern source';
    }
    
    [PatternSource] CreateNestedSource([System.Text.RegularExpressions.Match]$Match, [int]$SkipLast) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($null -eq $Match -or -not $Match.Success) { return [PatternSource]::new('') }
        if ($this.StartAt -eq $Match.Index) {
            $NextStartAt = $Match.Index + $Match.Length;
            if ($NextStartAt -le $this.Pattern.Length -and $this.Pattern.Substring($this.StartAt, $Match.Length) -ceq $Match.Value) {
                if ($SkipLast -lt 1) {
                    $this.NestedSource = [PatternSource]::new($Match.Value);
                } else {
                    if ($SkipLast -lt $Match.Length) {
                        $this.NestedSource = [PatternSource]::new($Match.Value.Substring(0, $Match.Length - $SkipLast));
                    } else {
                        return [PatternSource]::new('')
                    }
                }
                return $this.NestedSource;
            }
        }
        throw '$Match is not part of pattern source';
    }

    [PatternSource] CreateNestedSource([int]$Length) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        if ($Length -lt 1 -or $this.StartAt -eq $this.Pattern.Length) { return [PatternSource]::new('') }
        if (($this.StartAt + $Length) -ge $this.Pattern.Length) {
            $this.NestedSource = [PatternSource]::new($this.Pattern.Substring($this.StartAt));
        } else {
            $this.NestedSource = [PatternSource]::new($this.Pattern.Substring($this.StartAt, $Length));
        }
        return $this.NestedSource;
    }

    [bool] CharMatchesAtOffset([char]$c, [int]$Offset) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        $Offset += $this.StartAt;
        return $Offset -ge 0 -and $Offset -lt $this.Pattern.Length -and $this.Pattern[$Offset] -ceq $c;
    }

    [Nullable[char]] GetCharAtOffset([int]$Offset) {
        if (-not $this.CheckNestedSource()) { throw 'An existing nested source has not reached the end of the pattern' }
        $Offset += $this.StartAt;
        if ($Offset -ge 0 -and $Offset -lt $this.Pattern.Length) { return $this.Pattern[$Offset] }
        return $null;
    }
}

class NestedParsingCheckPoint {
    hidden [int]$StartAt;
    hidden [PatternSource]$Source;
    hidden [NestedParsingCheckPoint]$NestedSource;
    [PatternSource] GetSource() { return $this.Source }
    hidden NestedParsingCheckPoint([PatternSource]$Source) {
        $this.StartAt = $Source.StartAt;
        if ($null -ne $Source.NestedSource) {
            $this.NestedSource = [NestedParsingCheckPoint]::new($Source.NestedSource);
        }
    }
    hidden [void] BaseRestore() {
        $this.Source.StartAt = $this.StartAt;
        if ($null -ne $this.NestedSource) {
            $this.Source.NestedSource = $this.NestedSource.Source;
            $this.NestedSource.BaseRestore();
        }
    }
}

class ParsingCheckPoint : NestedParsingCheckPoint {
    hidden [string]$CurrentPattern;
    hidden [ParsingCheckPoint]$CurrentType;
    hidden [int]$CurrentGroupingDepth;
    hidden [string]$RecentPattern;
    hidden [RegexTokenType]$RecentType;
    hidden [int]$RecentGroupingDepth;
    hidden [int]$GroupingDepth;
    hidden [int]$ParsedTokenCount;
    hidden [RegexTokenWriter]$Writer;
    [RegexTokenWriter] GetWriter() { return $this.Writer }
    ParsingCheckPoint([PatternSource]$Source, [RegexTokenWriter]$Writer) : base($Source) {
        if ($null -ne ($this.Writer = $Writer).Current) {
            $this.CurrentPattern = $Writer.Current.Pattern.ToString();
            $this.CurrentType = $Writer.Current.Type;
            $this.CurrentGroupingDepth = $Writer.Current.GroupingDepth;
        }
        if ($null -ne $Writer.RecentClosed) {
            $this.RecentPattern = $Writer.RecentClosed.Pattern.ToString();
            $this.RecentType = $Writer.RecentClosed.Type;
            $this.RecentGroupingDepth = $Writer.RecentClosed.GroupingDepth;
        }
        $this.GroupingDepth = $Writer.GroupingDepth;
        $this.ParsedTokenCount = $Writer.ParsedTokens.Count;
    }
    [void] Restore() {
        $this.BaseRestore();
        if ($null -ne $this.CurrentPattern) {
            $this.Writer.Current = [RegexTokenBuilder]::new([string]$this.CurrentPattern, $this.CurrentType, $this.CurrentGroupingDepth);
        } else {
            $this.Writer.Current = $null;
        }
        if ($null -ne $this.RecentPattern) {
            $this.Writer.RecentClosed = [RegexTokenBuilder]::new([string]$this.RecentPattern, $this.RecentType, $this.RecentGroupingDepth);
        } else {
            $this.Writer.RecentClosed = $null;
        }
        $this.Writer.GroupingDepth = $this.GroupingDepth;
        while ($this.Writer.ParsedTokens.Count -gt $this.ParsedTokenCount) { $this.Writer.ParsedTokens.RemoveAt($this.ParsedTokenCount) }
    }
}

Set-Variable -Name 'ClassNamesByTokenType' -Scope 'Script' -Option ReadOnly -Value ({
    $Dictionary = [System.Collections.Generic.Dictionary[RegexTokenType, string]]::new();
    $Dictionary.Add([RegexTokenType]::Anchor, 'regex-anchor');
    $Dictionary.Add([RegexTokenType]::Alternation, 'regex-symbol');
    $Dictionary.Add([RegexTokenType]::Quantifier, 'regex-symbol');
    $Dictionary.Add([RegexTokenType]::EscapedMeta, 'regex-escaped');
    $Dictionary.Add([RegexTokenType]::AnyChar, 'regex-symbol');
    $Dictionary.Add([RegexTokenType]::CharClass, 'regex-char-class');
    $Dictionary.Add([RegexTokenType]::Boundary, 'regex-boundary');
    $Dictionary.Add([RegexTokenType]::CharEscape, 'regex-escaped');
    $Dictionary.Add([RegexTokenType]::BackReference, 'regex-backref');
    $Dictionary.Add([RegexTokenType]::Group, 'regex-group');
    return [System.Collections.ObjectModel.ReadOnlyDictionary[RegexTokenType, string]]::new($Dictionary);
}.Invoke()) -Force;

Set-Variable -Name 'GroupingRegex' -Scope 'Script' -Option ReadOnly -Value ([System.Text.RegularExpressions.Regex]::new(@'
(?>
    (?>
        (?'open'
            (?<!\\)
            \(
        )
        (
            \\.
        |
            [^(\\)]+
        )*
    )+
    (?>
        (?'-open'
            (?<!\\)\)
        )
        (
            \\.
        |
            [^(\\)]+
        )*
    )+
)+?
(?(open)(?!))
'@, ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::IgnorePatternWhitespace -bor [System.Text.RegularExpressions.RegexOptions]::Compiled)))) -Force;

Set-Variable -Name 'GroupTypeRegex' -Scope 'Script' -Option ReadOnly -Value ([System.Text.RegularExpressions.Regex]::new(@'
\?
    ((?=(-?[ixsmn])+[:)])(-?[ixsmn])+
        [:#=!|>]
        |<
            (
                [!=]
                |[\w\-]+>
            )
        |'[\w\-]+'
    )
    |[\w\-]+(?=\))
'@, ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::IgnorePatternWhitespace -bor [System.Text.RegularExpressions.RegexOptions]::Compiled)))) -Force;

Set-Variable -Name 'EscapedRegex' -Scope 'Script' -Option ReadOnly -Value ([System.Text.RegularExpressions.Regex]::new('(\\.)+', [System.Text.RegularExpressions.RegexOptions]::Compiled)) -Force;

Set-Variable -Name 'CharClassTokenRegex' -Scope 'Script' -Option ReadOnly -Value ([System.Text.RegularExpressions.Regex]::new(@'
(?(?=\\)
        (?:
            (?<m>(?:\\[\[\^$.|?*+(){}])+)
            |(?<z>(?:\\[AZz])+)
            |(?<e>
                (?:
                    \\(?:
                        [aRrnDdefvSstWw]
                        |c[a-zA-Z]
                        |x[a-fA-F]{2}(?:[a-fA-F]{2})?
                        |u[a-fA-F]{4}
                        |[Pp]\{[^\s{}]+\}
                        |0
                    )
                )+)
            |(?<r>
                (?:
                    \\(?:
                        -?[1-9]\d*
                        |k<[\w\-]+>
                    )
                )+
            )
        )|(?:
            (?<s>[\s\r\n]+)
            |(?<z>[$^]+)
            |(?<q>
                (?:
                    \+[+?]?
                    |(?:
                        [?*]
                        |\{(?:\d+(?:,(?:\d+)?)?|,\d+)\}
                    )[?+]?
                ))
        )
    )
'@, ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::IgnorePatternWhitespace -bor [System.Text.RegularExpressions.RegexOptions]::Compiled)))) -Force;

Set-Variable -Name 'GroupedTokenRegex' -Scope 'Script' -Option ReadOnly -Value ([System.Text.RegularExpressions.Regex]::new(@'
(?(?=\\)
        (?:
            (?<m>(?:\\[\[\^$.|?*+(){}])+)
            |(?<z>(?:\\[AZz])+)
            |(?<e>
                (?:
                    \\(?:
                        [aRrnDdefvSstWw]
                        |c[a-zA-Z]
                        |x[a-fA-F]{2}(?:[a-fA-F]{2})?
                        |u[a-fA-F]{4}
                        |[Pp]\{[^\s{}]+\}
                        |0
                    )
                )+)
            |(?<b>(?:\\[Bb])+)
            |(?<r>
                (?:
                    \\(?:
                        -?[1-9]\d*
                        |k<[\w\-]+>
                    )
                )+
            )
        )|(?:
            (?<s>[\s\r\n]+)
            |(?<z>[$^]+)
            |(?<x>\|+)
            |(?<a>\.+)
            |(?<q>
                (?:
                    \+[+?]?
                    |(?:
                        [?*]
                        |\{(?:\d+(?:,(?:\d+)?)?|,\d+)\}
                    )[?+]?
                ))
            |\[(?<c>(?:\\.|[^\\\]]+)*)\]
        )
    )
'@, ([System.Text.RegularExpressions.RegexOptions]([System.Text.RegularExpressions.RegexOptions]::IgnorePatternWhitespace -bor [System.Text.RegularExpressions.RegexOptions]::Compiled)))) -Force;

Function Convert-EscapedToRegexTokens {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [PatternSource]$Source,
        
        [Parameter(Mandatory = $true)]
        [RegexTokenWriter]$Writer
    )

    while (-not $Source.IsEndOfPattern()) {
        $EscapedMatch = $Source.Match($Script:EscapedRegex);
        if ($EscapedMatch.Success) {
            if ($EscapedMatch.Index -gt 0) {
                $Writer.Write($Source.Read($EscapedMatch.Index), [RegexTokenType]::Literal);
            }
            $Writer.Write($Source.Read($EscapedMatch.Length), [RegexTokenType]::CharEscape);
        } else {
            $Writer.Write($Source.ReadToEnd(), [RegexTokenType]::Literal);
            break;
        }
    }
}

Function Convert-GroupedToRegexTokens {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [PatternSource]$Source,
        
        [Parameter(Mandatory = $true)]
        [RegexTokenWriter]$Writer
    )

    while (-not $Source.IsEndOfPattern()) {
        $GroupedTokenMatch = $Source.Match($Script:GroupedTokenRegex);
        if (-not $GroupedTokenMatch.Success) {
            Convert-EscapedToRegexTokens -Source $Source -Writer $Writer;
            break;
        }
        $Length = $GroupedTokenMatch.Index - $Source.GetCurrentPosition();
        if ($Length -gt 0) {
            Convert-EscapedToRegexTokens -Source $Source.CreateNestedSource($Length) -Writer $Writer;
        }
        switch ((($GroupedTokenMatch.Groups | Select-Object -Skip 1) | Where-Object { $_.Success  } | ForEach-Object { $_.Name } |  Select-Object -First 1)) {
            'm' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::EscapedMeta);
                break;
            }
            'z' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::Anchor);
                break;
            }
            'e' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::CharEscape);
                break;
            }
            'b' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::Boundary);
                break;
            }
            'r' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::BackReference);
                break;
            }
            's' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::WhiteSpace);
                break;
            }
            'x' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::Alternation);
                break;
            }
            'a' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::AnyChar);
                break;
            }
            'q' {
                $Writer.Write($Source.Read($GroupedTokenMatch.Length), [RegexTokenType]::Quantifier);
                break;
            }
            Default {
                $Match = $GroupedTokenMatch.Groups['c'];
                $Source.Read(1);
                $NestedSource = $Source.CreateNestedSource($Match)
                if ($Match.Value.StartsWith('^')) {
                    $NestedSource.Read(1);
                    $Writer.Write('[^', [RegexTokenType]::CharClass);
                } else {
                    $Writer.Write('[', [RegexTokenType]::CharClass);
                }
                while (-not $NestedSource.IsEndOfPattern()) {
                    $CharClassTokenMatch = $NestedSource.Match($Match);
                    if (-not $CharClassTokenMatch.Success) {
                        Convert-EscapedToRegexTokens -Source $NestedSource -Writer $Writer;
                        break;
                    }
                    $Length = $CharClassTokenMatch.Index - $NestedSource.GetCurrentPosition();
                    if ($Length -gt 0) {
                        Convert-EscapedToRegexTokens -Source $NestedSource.CreateNestedSource($Length) -Writer $Writer;
                    }
                    switch ((($CharClassTokenMatch.Groups | Select-Object -Skip 1) | Where-Object { $_.Success  } | ForEach-Object { $_.Name } |  Select-Object -First 1)) {
                        'm' {
                            $Writer.Write($NestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::EscapedMeta);
                            break;
                        }
                        'z' {
                            $Writer.Write($NestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::Anchor);
                            break;
                        }
                        'e' {
                            $Writer.Write($NestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::CharEscape);
                            break;
                        }
                        'r' {
                            $Writer.Write($NestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::BackReference);
                        }
                        's' {
                            $Writer.Write($NestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::WhiteSpace);
                            break;
                        }
                        'q' {
                            $Writer.Write($GNestedSource.Read($CharClassTokenMatch.Length), [RegexTokenType]::Quantifier);
                            break;
                        }
                    }
                }
                $Writer.Write($Source.Read(1), [RegexTokenType]::CharClass);
                break;
            }
        }
    }
}

Function ConvertTo-RegexTokens {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true)]
        [PatternSource]$Source,
        
        [Parameter(Mandatory = $true)]
        [RegexTokenWriter]$Writer
    )

    while (-not $Source.IsEndOfPattern()) {
        $GroupingMatch = $Source.Match($Script:GroupingRegex);
        if (-not $GroupingMatch.Success) {
            Convert-GoupedToRegexTokens -Source $Source -Writer $Writer;
            break;
        }
        $Length = $GroupingMatch.Index - $Source.GetCurrentPosition();
        if ($Length -gt 0) {
            Convert-GroupedToRegexTokens -Source $Source.CreateNestedSource($Length) -Writer $Writer;
        }
        $NestedSource = $Source.CreateNestedSource($GroupingMatch, 1);
        $GroupTypeMatch = $NestedSource.Match($Script:GroupTypeRegex, 1);
        if ($GroupTypeMatch.Success) {
            $Writer.Write($NestedSource.Read($GroupTypeMatch.Length + 1), [RegexTokenType]::Group);
        } else {
            $Writer.Write($NestedSource.Read(1), [RegexTokenType]::Group);
        }
        ConvertTo-RegexTokens -Source $NestedSource -Writer $Writer;
        $Writer.Write($Source.Read(1), [RegexTokenType]::Group);
    }
}

Function Convert-RegexToHtml {
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory = $true, ValueFromPipeline = $true)]
        [string]$RegularExpression,
        
        [Parameter(Mandatory = $true)]
        [System.IO.TextWriter]$TextWriter
    )

    Begin {
        [string]$WhiteSpace = '';
        [string]$ClassName = '';
    }
    
    Process {
        [RegexTokenWriter]$Writer = [RegexTokenWriter]::new();
        ConvertTo-RegexTokens -Source ([PatternSource]::new($RegularExpression)) -Writer $Writer;
        foreach ($ContentToken in $Writer.GetTokens($true)) {
            if ($ContentToken.Type -eq [RegexTokenType]::WhiteSpace) {
                $WhiteSpace = $ContentToken.Text;
            } else {
                [string]$n = '';
                if ($Script:ClassNamesByTokenType.TryGetValue($ContentToken.Type, [ref]$n) -and -not [string]::IsNullOrWhiteSpace($n)) {
                    if ($ClassName -ne $n) {
                        if ($ClassName.Length -gt 0) {
                            if ($WhiteSpace.Length -gt 0) {
                                $TextWriter.Write('</span>');
                                $TextWriter.Write($WhiteSpace);
                                $TextWriter.Write('<span class="');
                            } else {
                                $TextWriter.Write('</span><span class="');
                            }
                        } else {
                            if ($WhiteSpace.Length -gt 0) { $TextWriter.Write($WhiteSpace) }
                            $TextWriter.Write('<span class="');
                        }
                        $TextWriter.Write($n);
                        if ($ContentToken.Type -eq [RegexTokenType]::Group) { $TextWriter.Write(($ContentToken.Level % 10)) }
                        $TextWriter.Write('">');
                        $ClassName = $n;
                    } else {
                        if ($WhiteSpace.Length -gt 0) { $TextWriter.Write($WhiteSpace) }
                    }
                } else {
                    if ($ClassName.Length -gt 0) {
                        $TextWriter.Write('</span>');
                        $ClassName = '';
                    }
                    if ($WhiteSpace.Length -gt 0) { $TextWriter.Write($WhiteSpace) }
                }
                $TextWriter.Write($ContentToken.Text.Replace('>', '&gt;').Replace('<', '&lt;'));
                $WhiteSpace = '';
            }
        }
    }

    End {
        if ($ClassName.Length -gt 0) { $TextWriter.Write('</span>') }
        if ($WhiteSpace.Length -gt 0) { $TextWriter.Write($WhiteSpace) }
    }
}

$StringWriter = [System.IO.StringWriter]::new();
$StringWriter.Write('<pre><code class="language-regex">');
@(ConvertTo-ContentTokens -RegularExpression '(?<=<body((?!\s+class)\s+[^>=\s]+(=("[^">]+"|''[^''>]+''|[^>\s]+)?)?)*)\s+class=("[^">]+"|''[^''>]+''|[^>\s]+)') | Convert-TokensToHtml -TextWriter $StringWriter;
$StringWriter.Write('</code></pre>');
$StringWriter.ToString();
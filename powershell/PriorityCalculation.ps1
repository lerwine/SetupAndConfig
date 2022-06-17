$UrgencyImpactOnly = @(
    @{ urgency = 1; impact = 1; priority = 1},
    @{ urgency = 1; impact = 2; priority = 2},
    @{ urgency = 2; impact = 1; priority = 2},
    @{ urgency = 1; impact = 3; priority = 3},
    @{ urgency = 3; impact = 1; priority = 3},
    @{ urgency = 2; impact = 2; priority = 3},
    @{ urgency = 2; impact = 3; priority = 4},
    @{ urgency = 3; impact = 2; priority = 4},
    @{ urgency = 3; impact = 3; priority = 5}
);
$WithVip = @(
    @{ urgency = 1; impact = 1; vip = $true; priority = 1},
    @{ urgency = 1; impact = 1; vip = $false; priority = 2},
    @{ urgency = 1; impact = 2; vip = $true; priority = 2},
    @{ urgency = 1; impact = 2; vip = $false; priority = 3},
    @{ urgency = 2; impact = 1; vip = $true; priority = 2},
    @{ urgency = 2; impact = 1; vip = $false; priority = 3},
    @{ urgency = 1; impact = 3; vip = $true; priority = 3},
    @{ urgency = 1; impact = 3; vip = $false; priority = 4},
    @{ urgency = 3; impact = 1; vip = $true; priority = 3},
    @{ urgency = 3; impact = 1; vip = $false; priority = 4},
    @{ urgency = 2; impact = 2; vip = $true; priority = 3},
    @{ urgency = 2; impact = 2; vip = $false; priority = 3},
    @{ urgency = 2; impact = 3; vip = $true; priority = 4},
    @{ urgency = 2; impact = 3; vip = $false; priority = 4},
    @{ urgency = 3; impact = 2; vip = $true; priority = 4},
    @{ urgency = 3; impact = 2; vip = $false; priority = 4},
    @{ urgency = 3; impact = 3; vip = $true; priority = 4},
    @{ urgency = 3; impact = 3; vip = $false; priority = 5}
);
$WithMissionCritical = @(
    @{ urgency = 1; impact = 1; vip = $true; missionCritical = $true; priority = 1},
    @{ urgency = 1; impact = 1; vip = $true; missionCritical = $false; priority = 2},
    @{ urgency = 1; impact = 1; vip = $false; missionCritical = $true; priority = 2},
    @{ urgency = 1; impact = 1; vip = $false; missionCritical = $false; priority = 2},
    @{ urgency = 1; impact = 2; vip = $true; missionCritical = $true; priority = 2},
    @{ urgency = 1; impact = 2; vip = $true; missionCritical = $false; priority = 2},
    @{ urgency = 1; impact = 2; vip = $false; missionCritical = $true; priority = 2},
    @{ urgency = 1; impact = 2; vip = $false; missionCritical = $false; priority = 3},
    @{ urgency = 2; impact = 1; vip = $true; missionCritical = $true; priority = 2},
    @{ urgency = 2; impact = 1; vip = $true; missionCritical = $false; priority = 2},
    @{ urgency = 2; impact = 1; vip = $false; missionCritical = $true; priority = 2},
    @{ urgency = 2; impact = 1; vip = $false; missionCritical = $false; priority = 3},
    @{ urgency = 1; impact = 3; vip = $true; missionCritical = $true; priority = 3},
    @{ urgency = 1; impact = 3; vip = $true; missionCritical = $false; priority = 3},
    @{ urgency = 1; impact = 3; vip = $false; missionCritical = $true; priority = 3},
    @{ urgency = 1; impact = 3; vip = $false; missionCritical = $false; priority = 4},
    @{ urgency = 3; impact = 1; vip = $true; missionCritical = $true; priority = 3},
    @{ urgency = 3; impact = 1; vip = $true; missionCritical = $false; priority = 3},
    @{ urgency = 3; impact = 1; vip = $false; missionCritical = $true; priority = 3},
    @{ urgency = 3; impact = 1; vip = $false; missionCritical = $false; priority = 4},
    @{ urgency = 2; impact = 2; vip = $true; missionCritical = $true; priority = 3},
    @{ urgency = 2; impact = 2; vip = $true; missionCritical = $false; priority = 3},
    @{ urgency = 2; impact = 2; vip = $false; missionCritical = $true; priority = 3},
    @{ urgency = 2; impact = 2; vip = $false; missionCritical = $false; priority = 4},
    @{ urgency = 2; impact = 3; vip = $true; missionCritical = $true; priority = 3},
    @{ urgency = 2; impact = 3; vip = $true; missionCritical = $false; priority = 4},
    @{ urgency = 2; impact = 3; vip = $false; missionCritical = $true; priority = 4},
    @{ urgency = 2; impact = 3; vip = $false; missionCritical = $false; priority = 4},
    @{ urgency = 3; impact = 2; vip = $true; missionCritical = $true; priority = 3},
    @{ urgency = 3; impact = 2; vip = $true; missionCritical = $false; priority = 4},
    @{ urgency = 3; impact = 2; vip = $false; missionCritical = $true; priority = 4},
    @{ urgency = 3; impact = 2; vip = $false; missionCritical = $false; priority = 4},
    @{ urgency = 3; impact = 3; vip = $true; missionCritical = $true; priority = 4},
    @{ urgency = 3; impact = 3; vip = $true; missionCritical = $false; priority = 4},
    @{ urgency = 3; impact = 3; vip = $false; missionCritical = $true; priority = 4},
    @{ urgency = 3; impact = 3; vip = $false; missionCritical = $false; priority = 5}
);
[Xml]$Xml = @'
<table>
    <caption>Urgency and Impact Only</caption>
    <thead>
        <tr>
            <th scope="row">Urgency</th>
            <th scope="row">Impact</th>
            <th scope="row">Priority</th>
        </tr>
    </thead>
</table>
'@;
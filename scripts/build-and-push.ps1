Param(
    [string]$Registry = "ghcr.io",        # e.g. ghcr.io, registry.hub.docker.com
    [string]$ImageNamespace = "your-org", # e.g. your GitHub user/org or Docker Hub username
    [string]$ImageName = "anxiety-aid-tools",
    [string]$VersionTag,                  # Optional explicit version; if omitted uses package.json version
    [switch]$Latest,                      # Also tag :latest
    [switch]$MultiArch,                   # Build linux/amd64 + linux/arm64
    [switch]$Push                        # Actually push (omit to just build & tag locally)
)

# Stop on first error
$ErrorActionPreference = 'Stop'

function Get-PackageVersion {
    $pkg = Get-Content -Raw -Path (Join-Path $PSScriptRoot '..' 'package.json') | ConvertFrom-Json
    return $pkg.version
}

if (-not $VersionTag) {
    $VersionTag = Get-PackageVersion
}

$fullBase = "$Registry/$ImageNamespace/$ImageName"
$tagVersion = "$fullBase:v$VersionTag"
$tags = @($tagVersion)
if ($Latest) { $tags += "$fullBase:latest" }

Write-Host "Building image for tags: $($tags -join ', ')" -ForegroundColor Cyan

# Choose docker build or buildx for multi-arch
if ($MultiArch) {
    # Ensure buildx builder exists
    docker buildx inspect multiarch-builder 2>$null | Out-Null
    if ($LASTEXITCODE -ne 0) {
        docker buildx create --name multiarch-builder --use | Out-Null
    } else {
        docker buildx use multiarch-builder | Out-Null
    }
    $platforms = 'linux/amd64,linux/arm64'
    $tagArgs = ($tags | ForEach-Object { "-t $_" }) -join ' '
    $cmd = "docker buildx build --platform $platforms $tagArgs --file Dockerfile ."
    if ($Push) { $cmd += ' --push' }
    Write-Host $cmd -ForegroundColor Yellow
    iex $cmd
} else {
    $firstTag = $tags[0]
    docker build -t $firstTag -f Dockerfile .
    for ($i=1; $i -lt $tags.Count; $i++) {
        docker tag $firstTag $tags[$i]
    }
    if ($Push) {
        foreach ($t in $tags) { docker push $t }
    }
}

Write-Host "Done." -ForegroundColor Green

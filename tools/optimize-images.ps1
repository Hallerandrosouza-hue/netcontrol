# Otimiza as fotos originais (redimensiona + comprime) e gera js/media.js
Add-Type -AssemblyName System.Drawing
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $root 'assets\img'
New-Item -ItemType Directory -Force $out | Out-Null
$codec = [Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'

function Save-Opt($src, $dst, $max, $q) {
  $img = [Drawing.Image]::FromFile($src)
  foreach ($p in $img.PropertyItems) { if ($p.Id -eq 0x0112) { # orientação EXIF
      switch ($p.Value[0]) { 6 { $img.RotateFlip('Rotate90FlipNone') } 3 { $img.RotateFlip('Rotate180FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') } } } }
  $s = [Math]::Min([double]1, [double]$max / [double][Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $s); $h = [int]($img.Height * $s)
  $bmp = New-Object Drawing.Bitmap $w, $h
  $g = [Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'; $g.DrawImage($img, 0, 0, $w, $h); $g.Dispose()
  $ep = New-Object Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object Drawing.Imaging.EncoderParameter ([Drawing.Imaging.Encoder]::Quality), ([long]$q)
  $bmp.Save($dst, $codec, $ep); $bmp.Dispose(); $img.Dispose()
}

function Unique-Files($folder) {
  $seen = @{}
  Get-ChildItem (Get-ChildItem $root -Directory -Filter $folder | Select-Object -First 1).FullName -File | Where-Object { $_.Extension -match 'jpe?g|png' } | Sort-Object Name | ForEach-Object {
    $h = (Get-FileHash $_.FullName -Algorithm MD5).Hash
    if (-not $seen[$h]) { $seen[$h] = 1; $_ }
  }
}

$sets = [ordered]@{ cert = 'Entrega os certificados'; apr = 'Programa aluno aprendiz'; team = 'Professores'; indica = 'Amigo*'; curso = 'CURSO' }
$media = [ordered]@{}
foreach ($k in $sets.Keys) {
  $list = @(); $i = 1
  foreach ($f in (Unique-Files $sets[$k])) {
    $name = '{0}-{1:00}.jpg' -f $k, $i
    Save-Opt $f.FullName (Join-Path $out $name) 1400 80
    $list += "assets/img/$name"; $i++
  }
  $media[$k] = $list
  Write-Host "$k : $($list.Count)"
}
# logo
$logoSrc = Get-ChildItem (Join-Path $root 'Logo E visual da net') -File | Where-Object Extension -match 'jpe?g' | Select-Object -First 1
Save-Opt $logoSrc.FullName (Join-Path $out 'logo-27.jpg') 1100 88
# emblema (recorte do 27 + Anos) para o cabeçalho
$img = [Drawing.Image]::FromFile($logoSrc.FullName)
$rect = New-Object Drawing.Rectangle 90, 90, 1000, 850
$bmp = New-Object Drawing.Bitmap 360, 306
$g = [Drawing.Graphics]::FromImage($bmp); $g.InterpolationMode = 'HighQualityBicubic'
$g.DrawImage($img, (New-Object Drawing.Rectangle 0, 0, 360, 306), $rect, 'Pixel'); $g.Dispose()
$bmp.Save((Join-Path $out 'emblema-27.png'), [Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose(); $img.Dispose()

$js = "window.MEDIA = " + ($media | ConvertTo-Json -Depth 4) + ";"
Set-Content (Join-Path $root 'js\media.js') $js -Encoding UTF8


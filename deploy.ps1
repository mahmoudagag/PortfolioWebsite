# deploy.ps1

# 1. Automatic AWS ECR Login
Write-Host "Logging into ECR..." -ForegroundColor Cyan
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 952027539394.dkr.ecr.us-east-1.amazonaws.com

# 2. Define your apps
$services = @(
    @{ name="portfoliowebsite";   path="./PortfolioWebsite" },
    @{ name="whatstheword";       path="./WhatsTheWordApp" },
    @{ name="stockpapertrading";  path="./StockPaperTradingApp" },
    @{ name="mealsy";             path="./Mealsy" },
    @{ name="nginx-portfolio";    path="./Nginx" }
)

$ECR_URL = "952027539394.dkr.ecr.us-east-1.amazonaws.com"

foreach ($service in $services) {
    if (Test-Path $service.path) {
        Write-Host "`nBuilding and Pushing $($service.name)..." -ForegroundColor Yellow
        # Build specifically for the EC2 ARM architecture
        docker buildx build --platform linux/arm64 -t "$ECR_URL/$($service.name):latest" $($service.path) --push
    } else {
        Write-Host "Skipping $($service.name): Path not found at $($service.path)" -ForegroundColor Red
    }
}

Write-Host "`nAll images pushed! Go to EC2 and run: docker compose pull && docker compose up -d" -ForegroundColor Green

### In the EC2
# docker compose pull
# docker compose up -d
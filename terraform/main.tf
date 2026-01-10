provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "web_sg" {
  name        = "portfolio-web-sg"
  description = "Allow HTTP and HTTPS"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["69.137.231.244/32"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "aws_iam_role" "ec2_role" {
  name = "PortfolioWebsiteEC2RoleForECR"
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "portfolio-ec2-profile"
  role = data.aws_iam_role.ec2_role.name
}

resource "aws_instance" "portfolio" {
    ami = "ami-0f726def261571e98"
    instance_type = "t4g.micro"
    key_name = "portfolioWebsiteKeyPair"

    iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

    vpc_security_group_ids = [
        aws_security_group.web_sg.id
    ]

    tags = {
        Name = "portfolio-terraform"
    }
}

resource "aws_sns_topic" "alerts" {
    name = "portfolio-alerts"
}

resource "aws_sns_topic_subscription" "email_alerts" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = "agagmahmoud@gmail.com"
}

resource "aws_cloudwatch_metric_alarm" "high_cpu" {
    alarm_name = "portfolio-cpu-alarm"
    comparison_operator = "GreaterThanOrEqualToThreshold"
    evaluation_periods = 2
    metric_name = "CPUUtilization"
    namespace = "AWS/EC2"
    period = 300
    statistic = "Average"
    threshold = 80

    alarm_description = "This metric monitors ec2 cpu utilization"
    alarm_actions = [
        aws_sns_topic.alerts.arn
    ]

    dimensions = {
        InstanceId = aws_instance.portfolio.id
    }
}

resource "aws_cloudwatch_metric_alarm" "status_check_failed" {
  alarm_name          = "portfolio-status-check-failed"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "StatusCheckFailed"
  namespace           = "AWS/EC2"
  period              = 60
  statistic           = "Maximum"
  threshold           = 0

  alarm_description = "EC2 instance status check failed"
  alarm_actions     = [aws_sns_topic.alerts.arn]

  dimensions = {
    InstanceId = aws_instance.portfolio.id
  }
}
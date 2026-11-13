"""Deployment entrypoint; importing it validates required server configuration."""
from vira_app import create_app_from_environment
app = create_app_from_environment()

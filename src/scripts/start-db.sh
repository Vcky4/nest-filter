#!/bin/bash
set -e

SERVER="my_database_server"
PW="mysecretpassword"
DB="my_database"

# Function to check if Docker is installed
check_docker_installed() {
  if ! command -v docker &> /dev/null; then
    echo "Docker is not installed. Installing Docker..."
    install_docker
  else
    echo "Docker is already installed."
  fi
}

# Function to install Docker based on the OS
install_docker() {
  OS=$(uname -s)
  case $OS in
    Linux)
      install_docker_linux
      ;;
    Darwin)
      install_docker_mac
      ;;
    CYGWIN*|MINGW*|MSYS*)
      install_docker_windows
      ;;
    *)
      echo "Unsupported OS: $OS is not supported. Please install Docker manually."
      exit 1
      ;;
  esac
}

# Function to install Docker on Linux (Ubuntu)
install_docker_linux() {
  # Remove problematic PPA repository if it exists
  sudo add-apt-repository --remove ppa:jonathonf/vlc-3 || true

  # Install Docker using the official script
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  rm get-docker.sh
  sudo systemctl start docker
  sudo systemctl enable docker

  # Add the current user to the docker group
  sudo usermod -aG docker $USER
  echo "Added $USER to the docker group. Please log out and log back in to apply the changes."
}

# Function to install Docker on macOS
install_docker_mac() {
  # Install Homebrew if not installed
  if ! command -v brew &> /dev/null; then
    echo "Homebrew not found. Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  fi

  # Install Docker using Homebrew
  brew install --cask docker
  echo "Please start Docker.app from Applications folder or using Spotlight search."
}

# Function to install Docker on Windows
install_docker_windows() {
  echo "Please install Docker Desktop from the official Docker website: https://www.docker.com/products/docker-desktop"
  echo "Ensure Docker Desktop is running after installation."
}

# Function to check if Docker is running
check_docker_running() {
  if ! systemctl is-active --quiet docker; then
    echo "Docker is not running. Starting Docker..."
    sudo systemctl start docker
  else
    echo "Docker is already running."
  fi
}

# Check if Docker is installed
check_docker_installed

# Check if Docker is running
if [[ "$(uname -s)" == "Linux" ]]; then
  check_docker_running
fi

# Ensure the user has permissions to use Docker
if ! groups $USER | grep &>/dev/null "\bdocker\b"; then
  echo "Adding user $USER to docker group..."
  sudo usermod -aG docker $USER
  echo "Please log out and log back in to apply the changes, or run the script with sudo."
  exit 1
fi

echo "Stopping & removing old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e PGPASSWORD=$PW \
  -p 5432:5432 \
  -d postgres

# wait for pg to start
echo "Sleeping to wait for pg-server [$SERVER] to start"
sleep 3

# create the db
echo "CREATE DATABASE $DB ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U postgres
echo "\l" | docker exec -i $SERVER psql -U postgres

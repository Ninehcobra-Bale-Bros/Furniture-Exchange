pipeline {
    agent any

    stages {
        stage("Clone") {
            steps {
                git branch: "setup/cicd-backend",
                    url: "https://github.com/Ninehcobra-Bale-Bros/Furniture-Exchange.git"

                sh "ls -la ${WORKSPACE}"
            }
        }

        stage("Login to Docker hub") {
            steps {
                withDockerRegistry(credentialsId: "FurnitureExchange_cicd-backend", url: "https://index.docker.io/v1/") {
                    echo "Logged in to Docker Hub successfully"
                }
            }
        }

        stage("Run docker compose") {
            steps {
                sh " docker compose --env-file ./.env.development down -v"

                sh " docker compose --env-file ./.env.development up -d"
            }
        }
    }
}
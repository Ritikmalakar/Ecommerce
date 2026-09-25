
pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Ritikmalakar/Ecommerce.git'
            }
        }

        stage('Create ENV') {
            steps {
                withCredentials([
                    string(credentialsId: 'ecommerce-backend-env', variable: 'BACKEND_ENV'),
                    string(credentialsId: 'ecommerce-frontend-env', variable: 'FRONTEND_ENV')
                ]) {
                    sh '''
                        echo "$BACKEND_ENV" > server/.env
                        echo "$FRONTEND_ENV" > client/.env
                        cp client/.env .env
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Test') {
            steps {
                sh '''
                    docker compose ps

                    echo "Backend test:"
                    curl -f http://localhost:1111/category/getAll

                    echo ""
                    echo "Frontend test:"
                    curl -f http://localhost:3000
                '''
            }
        }
    }

    post {
        always {
            sh '''
                rm -f .env
                rm -f server/.env
                rm -f client/.env
            '''
        }

        success {
            echo 'Ecommerce Deployment Successful!'
        }

        failure {
            echo 'Ecommerce Deployment Failed!'
        }
    }
}


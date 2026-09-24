pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/Ritikmalakar/Ecommerce.git'
            }
        }

        stage('Create Environment Files') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'ecommerce-backend-env',
                        variable: 'BACKEND_ENV'
                    ),
                    string(
                        credentialsId: 'ecommerce-frontend-env',
                        variable: 'FRONTEND_ENV'
                    )
                ]) {
                    sh '''
                        set +x

                        printf '%s\\n' "$BACKEND_ENV" > server/.env
                        printf '%s\\n' "$FRONTEND_ENV" > client/.env

                        chmod 600 server/.env
                        chmod 600 client/.env

                        echo "Environment files created"
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                sh '''
                    docker compose down || true
                    docker compose build --no-cache
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up -d
                '''
            }
        }

        stage('Check') {
            steps {
                sh '''
                    docker compose ps

                    echo "Backend test:"
                    curl -f http://localhost:1111/category/getAll

                    echo ""
                    echo "Frontend test:"
                    curl -f -I http://localhost:3000
                '''
            }
        }
    }

    post {
        success {
            echo 'Ecommerce deployment successful!'
        }

        failure {
            echo 'Ecommerce deployment failed!'
        }

        always {
            sh '''
                rm -f server/.env
                rm -f client/.env
            '''
        }
    }
}

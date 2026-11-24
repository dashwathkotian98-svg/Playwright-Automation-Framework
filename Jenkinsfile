
pipeline {
    agent {
        label 'windows'
    }

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI = 'true'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out project'
                checkout scm
            }
        }

        stage('Clean Previous Results') {
            steps {
                bat 'if exist test-results rmdir /s /q test-results'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright tests passed successfully'
        }

        failure {
            echo 'Playwright tests failed. Check the console output and archived test artifacts.'
        }
    }
}

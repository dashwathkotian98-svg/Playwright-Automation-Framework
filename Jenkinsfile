
pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
        allure 'Allure'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out project'
                checkout scm
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
            allure([
                includeProperties: false,
                results: [[path: 'allure-results']]
            ])

            archiveArtifacts(
                artifacts: 'allure-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'Playwright tests passed successfully'
        }

        failure {
            echo 'Playwright tests failed. Check Allure report.'
        }
    }
}

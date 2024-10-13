pipeline {
    agent any

    tools {
        maven 'Maven' // Assurez-vous que Maven est configuré dans Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Deploy') {
            steps {
                // Ajoutez ici les étapes de déploiement si nécessaire
            }
        }
    }

    post {
        always {
            junit '**/target/surefire-reports/TEST-*.xml'
        }
    }
}
pipeline {
    agent {
        docker {
            image 'maven:3.8.1-jdk-11'
            args '-v /root/.m2:/root/.m2'
        }
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

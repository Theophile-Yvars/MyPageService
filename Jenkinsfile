pipeline {
    agent any

    environment {
        // Configuration de SonarQube
        sonarQubeScannerHome = tool 'sonarqube-scanner'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building the project'
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing the project'
                sh 'mvn test'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis'
                withSonarQubeEnv('sonarqube-scanner') {
                    sh "${sonarQubeScannerHome}/bin/sonar-scanner"
                }
            }
        }
    }
}
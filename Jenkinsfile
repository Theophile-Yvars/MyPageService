pipeline {
    agent any

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
                withSonarQubeEnv(installationName: 'sq1') {
                    sh './mvnw clean org.sonarsource.scanner.maven:sonar-maven-plugin:3.9.0.2155:sonar'
                }
            }
        }
    }
}
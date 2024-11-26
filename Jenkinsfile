pipeline {
    agent {
        label 'agent1'
    }
    tools {
        maven 'maven:3.9.9' // Remplacez par la version de Maven que vous avez configurée
    }
    environment {
        SONAR_SCANNER_HOME = tool 'SonarQube Scanner' // Remplacez par le nom de l'outil SonarQube Scanner configuré dans Jenkins
    }
    stages {
        stage('Build') {
            steps {
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Test') { 
            steps {
                sh 'mvn test' 
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml' 
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('sq1') { // Remplacez 'SonarQube' par le nom de l'instance SonarQube configurée dans Jenkins
                    sh 'mvn sonar:sonar'
                }
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
    }
}

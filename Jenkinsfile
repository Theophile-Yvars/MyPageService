pipeline {
    agent {
        label 'agent1'
    }
    tools {
        maven 'maven:3.9.9' // Remplacez par la version de Maven que vous avez configurée
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
    }
}

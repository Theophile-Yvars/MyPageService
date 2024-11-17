pipeline {
    agent any

    environment {
        MAVEN_HOME = tool name: 'maven:3.9.9', type: 'maven'
    }

    stages {
        stage('Build') {
            steps {
                sh "${MAVEN_HOME}/bin/mvn -B -DskipTests clean package"
            }
        }
    }
}

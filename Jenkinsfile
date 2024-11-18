pipeline {
    agent {
        label 'agent1'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                // Nettoyage du workspace avant de commencer le build
                cleanWs()
            }
        }

        stage('Build') {
            steps {
                // Utilisation de Maven pour construire le projet
                sh "mvn -B -DskipTests clean package"
            }
        }

        stage('Test') {
            steps {
                // Exécution des tests
                sh "mvn test"
            }
        }
    }

    post {
        always {
            // Nettoyage du workspace après le build
            cleanWs()
        }
    }
}

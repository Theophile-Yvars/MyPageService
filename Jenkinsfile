pipeline {
    agent {
        label 'agent1'
    }
    tools {
        maven 'maven:3.9.9' 
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
                script {
                    // Obtenir le nom de la branche
                    def branchName = env.BRANCH_NAME ?: 'main'

                    // Obtenir l'artifactId du projet Maven
                    def artifactId = sh(script: 'mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout', returnStdout: true).trim()

                    // Définir le nom du projet SonarQube
                    def projectKey = "${artifactId}-${branchName}"

                    withSonarQubeEnv(installationName: 'sq1') { // Remplacez 'sq1' par le nom de l'instance SonarQube configurée dans Jenkins
                        sh "mvn sonar:sonar -Dsonar.projectKey=${projectKey} -Dsonar.projectName=${projectKey}"
                    }
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

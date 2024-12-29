pipeline {
    agent {
        label 'agent1'
    }
    tools {
        maven 'maven:3.9.9'
    }
    environment {
        NEXUS_URL = 'http://manager1:8083'
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
        }/*
        stage('Update Version') {
            when {
                expression { return env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    // Lire la version actuelle du pom.xml
                    def currentVersion = sh(script: 'mvn help:evaluate -Dexpression=project.version -q -DforceStdout', returnStdout: true).trim()

                    // Déterminer le type de changement en fonction de la branche et de l'action
                    def changeType = determineChangeType(env.BRANCH_NAME, env.CHANGE_ID)

                    // Incrémenter la version en fonction des changements
                    def newVersion = incrementVersion(currentVersion, changeType)

                    // Mettre à jour la version du projet
                    sh "mvn versions:set -DnewVersion=${newVersion}"
                    sh "mvn versions:commit"
                }
            }
        }*/
        stage('Deploy to Nexus') {
            when {
                expression { return env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    // Lire la version actuelle du pom.xml
                    def currentVersion = sh(script: 'mvn help:evaluate -Dexpression=project.version -q -DforceStdout', returnStdout: true).trim()

                    // Déterminer le type de changement en fonction de la branche et de l'action
                    def changeType = determineChangeType(env.BRANCH_NAME, env.CHANGE_ID)

                    // Incrémenter la version en fonction des changements
                    def newVersion = incrementVersion(currentVersion, changeType)

                    // Mettre à jour la version du projet
                    sh "mvn versions:set -DnewVersion=${newVersion}"
                    sh "mvn versions:commit"

                    // Utilisation des credentials pour récupérer le nom d'utilisateur et le mot de passe
                    withCredentials([usernamePassword(credentialsId: 'nexus-credentials-id', usernameVariable: 'NEXUS_USERNAME', passwordVariable: 'NEXUS_PASSWORD')]) {
                        // Création d'un fichier settings.xml temporaire avec les secrets
                        writeFile file: 'settings.xml', text: """
                            <settings>
                                <servers>
                                    <server>
                                        <id>nexus-snapshots</id>
                                        <username>${NEXUS_USERNAME}</username>
                                        <password>${NEXUS_PASSWORD}</password>
                                    </server>
                                </servers>
                            </settings>
                        """

                        // Exécution de la commande Maven avec le settings.xml temporaire
                        sh 'mvn deploy -s settings.xml'
                    }
                    // Committer et pousser la nouvelle version dans GitHub
                    sh 'git config user.name "Jenkins"'
                    sh 'git config user.email "jenkins@ci.com"'

                    // Ajouter et committer le changement de version dans Git
                    sh 'git add pom.xml'
                    sh 'git commit -m "Update version to ${newVersion}"'

                    // Pousser le commit vers GitHub
                    sh 'git push origin ${env.BRANCH_NAME}'
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

def determineChangeType(String branchName, String changeId) {
    if (branchName == 'develop') {
        if (changeId == 'merge') {
            return 'MINOR'
        } else {
            return 'PATCH'
        }
    } else {
        return 'PATCH' // Par défaut, pour les autres branches
    }
}

def incrementVersion(String currentVersion, String changeType) {
    def versionParts = currentVersion.split('\\.')
    def major = versionParts[0].toInteger()
    def minor = versionParts[1].toInteger()
    def patch = versionParts[2].split('-')[0].toInteger()
    def snapshot = versionParts[2].contains('-SNAPSHOT') ? '-SNAPSHOT' : ''

    // Incrémenter la version en fonction du type de changement
    if (changeType == 'MAJOR') {
        major++
        minor = 0
        patch = 0
    } else if (changeType == 'MINOR') {
        minor++
        patch = 0
    } else if (changeType == 'PATCH') {
        patch++
    }

    // Reconstruire la nouvelle version
    return "${major}.${minor}.${patch}${snapshot}"
}

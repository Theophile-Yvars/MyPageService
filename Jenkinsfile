pipeline {
    agent {
        label 'agent1'
    }
    tools {
        maven 'maven:3.9.9'
    }
    environment {
        NEXUS_USERNAME = credentials('nexus-username')
        NEXUS_PASSWORD = credentials('nexus-password')
        NEXUS_URL = credentials('nexus-url')
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
        }
        stage('Deploy to Nexus') {
            when {
                expression { return env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'main' }
            }
            steps {
                script {
                    // Obtenir l'artifactId du projet Maven
                    def artifactId = sh(script: 'mvn help:evaluate -Dexpression=project.artifactId -q -DforceStdout', returnStdout: true).trim()

                    // Définir le nom du projet Nexus
                    def projectKey = "${artifactId}-SNAPSHOT"

                    // Créer le fichier settings.xml avec les identifiants
                    writeFile file: 'settings.xml', text: """
                    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
                              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                              xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
                        <servers>
                            <server>
                                <id>nexus</id>
                                <username>${NEXUS_USERNAME}</username>
                                <password>${NEXUS_PASSWORD}</password>
                            </server>
                        </servers>
                        <profiles>
                            <profile>
                                <id>nexus</id>
                                <repositories>
                                    <repository>
                                        <id>nexus</id>
                                        <url>${NEXUS_URL}/repository/maven-snapshots/</url>
                                        <releases>
                                            <enabled>false</enabled>
                                        </releases>
                                        <snapshots>
                                            <enabled>true</enabled>
                                        </snapshots>
                                    </repository>
                                </repositories>
                            </profile>
                        </profiles>
                        <activeProfiles>
                            <activeProfile>nexus</activeProfile>
                        </activeProfiles>
                    </settings>
                    """

                    // Déployer vers Nexus
                    sh "mvn deploy -s settings.xml -DaltDeploymentRepository=nexus::default::${NEXUS_URL}/repository/maven-snapshots/"
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

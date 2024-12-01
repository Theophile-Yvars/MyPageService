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
        stage('Deploy to Nexus') {
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

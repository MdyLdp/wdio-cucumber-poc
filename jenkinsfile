pipeline {
    agent any
    tools {
        nodejs 'recent node'  // Specify the Node.js installation name
        allure 'allure'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    sh 'rm -rf allure-report'
                    sh 'rm -rf reports/'
                }
                checkout([
                $class: 'GitSCM', 
                branches: [[name: '*/main']], 
                doGenerateSubmoduleConfigurations: false, 
                extensions: [], 
                submoduleCfg: [], 
                userRemoteConfigs: [[url: 'https://github.com/MdyLdp/wdio-cucumber-poc.git']]
                ])
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'node -v'
                    sh 'npm list -g --depth=0'
                    sh 'pwd'
                }
            }
        }

        stage('Run Tests') {
            
            steps {
                script {
                    try {
                        sh 'npm install'  // Install dependencies if needed
                        sh 'npm run test'
                        sh 'npm list -g --depth=0'
                        sh 'pwd'
                    } catch (Exception e) {
                        currentBuild.result = 'UNSTABLE'
                        echo "Tests failed but continuing with the build"
                    }
                }
            }
        }

        stage('Allure Reports') {
            steps {
                script {
                    sh 'pwd'
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'reports/local/allure-results']]
                    ])
                }
            }
        }
    }
}

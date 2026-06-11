pipeline {

    agent any

    stages {

        stage("build") {

            steps {
                echo 'building the application...'
            }
        }

        stage("test") {

            steps {
                echo 'testing the application...'
            }
        }

        stage("test the frontend") {

            steps {
                echo 'testing the frontend...'
                echo 'yarn started...'
                nodejs('Node-26.3'){
                    sh 'yarn install'
                }
            }
        }

        stage("deploy") {

            steps {
                echo 'deplyonm the application...'
            }
        }
    }
}

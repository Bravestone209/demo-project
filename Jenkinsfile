pipeline {
    agent any

    stages {
        stage("build") {
            steps {
                echo 'building the application...'
            }
        }

        stage("environment check") {
            steps {
                sh '''
                    whoami
                    node -v || true
                    npm -v || true
                '''
            }
        }

        stage("test") {
            steps {
                echo 'testing the application...'
            }
        }

        stage("test and build frontend") {
            steps {
                echo 'testing the frontend...'
                echo 'yarn started...'

                nodejs('Node-26.3') {
                    sh 'yarn install'
                    sh 'yarn build || true'
                }
            }
        }

        stage("deploy to infinityfree") {
            when {
                branch 'feature'
            }

            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'infinityfree-ftp-creds',
                        usernameVariable: 'FTP_USER',
                        passwordVariable: 'FTP_PASS'
                    )
                ]) {
                    sh '''
                        # Check if lftp is installed, install if missing
                        if ! command -v lftp &> /dev/null; then
                            echo "lftp not found, installing..."
                            sudo apt-get update && sudo apt-get install -y lftp || true
                        fi

                        FTP_HOST="ftpupload.net"
                        REMOTE_DIR="/htdocs"

                        echo "Starting deployment to InfinityFree ($FTP_HOST)..."

                        lftp -c "
                        set ftp:ssl-allow no;
                        open -u $FTP_USER,$FTP_PASS $FTP_HOST;
                        mirror --reverse --delete --verbose ./ $REMOTE_DIR \
                            --exclude-glob .git/ \
                            --exclude-glob .jenkins/ \
                            --exclude-glob Jenkinsfile \
                            --exclude-glob node_modules/
                        "

                        echo "Deployment to http://demo-app.free.nf completed successfully!"
                    '''
                }
            }
        }
    }
}
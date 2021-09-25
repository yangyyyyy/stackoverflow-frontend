pipeline {
    agent any

    environment {
        JOB_NAME = 'frontend'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    sh "cd $WORKSPACE; sudo rm -rf node_modules ; sudo rm -f package-lock.json"
                    sh 'npm cache clear --force'

                    sh 'npm install'

                    sh 'npm run build'
                }
            }
        }

        stage('Deliver'){
            steps{
                sh "sudo sh makeDist.sh"
                sh 'sudo cp -r ./dist/* /www/server/nginx/html'
                sh 'sudo service nginx restart'
            }
        }
    }
}

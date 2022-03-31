pipeline{
	agent any

	environment {
        REPOSITORY = "https://github.com/yangyyyyy/stackoverflow-frontend.git"
		SERVICE_DIR="./"
        DOCKER_REGISTRY_HOST = "172.29.7.157:85"
        DOCKER_REGISTRY = "172.29.7.157:85/frontend/frontend-service"
	}

	stages {
        stage('pull code') {
			steps {
				echo "fetching code from git:${REPOSITORY}"
				deleteDir()
				git "${REPOSITORY}"
                script {
                    time = sh(returnStdout: true, script: 'date "+%Y%m%d%H%M"').trim()
                    git_version = sh(returnStdout: true, script: 'git log -1 --pretty=format:"%h"').trim()
                    build_tag = time+git_version
                }
			}
		}

		stage('build') {
            steps {
                echo "building"
                dir(SERVICE_DIR){
                    sh "cd $WORKSPACE; sudo rm -rf node_modules ; sudo rm -f package-lock.json"
                    sh 'npm cache clear --force'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('build image') {
			steps {
                echo "building image"
                echo "image tag : ${build_tag}"
                dir(SERVICE_DIR){
                    sh "ls -l"
                    sh "docker build -t ${DOCKER_REGISTRY}:${build_tag} --network host ."
                }
			}
		}

        stage('push docker') {
            steps {
                echo "pushing image"
                dir(SERVICE_DIR){
                  sh "ls -l"
                  withCredentials([usernamePassword(credentialsId: 'docker_registry', passwordVariable: 'password', usernameVariable: 'username')]) {
                      sh "docker login -u ${username} -p ${password} ${DOCKER_REGISTRY_HOST}"
                      sh "docker push ${DOCKER_REGISTRY}:${build_tag}"
                  }
                }
            }
        }

        stage('update yaml') {
            steps{
                echo "changing yaml image tag"
                dir(SERVICE_DIR){
                    sh "ls -l"
                    sh "sed -i 's/<BUILD_TAG>/${build_tag}/' k8s.yaml"
                    sh "cat k8s.yaml"
                }
            }
        }

        stage('deploy') {
			steps {
				echo "deploying"
				dir(SERVICE_DIR){
				    sh "ls -l"
				    sh "kubectl apply -f k8s.yaml"
				}
			}
		}
	}
}

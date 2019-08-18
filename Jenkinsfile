pipeline {
  agent {
    docker {
      image 'node:latest'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('NPM Version') {
      steps {
        sh 'node -v'
        sh 'npm --version'
      }
    }
  }
}
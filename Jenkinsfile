pipeline {
  agent {
    docker {
      image 'node:latest'
    }

  }
  stages {
    stage('NPM Version') {
      steps {
        sh 'node -v'
        sh 'npm --version'
      }
    }
    stage('NPM Install') {
      steps {
        sh 'ls'
        sh 'npm install'
      }
    }
    stage('Test:unit') {
      steps {
        sh 'npm run test:unit'
        sh 'ls'
      }
    }
  }
}
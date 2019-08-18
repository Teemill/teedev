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
        sh '''ls
npm install'''
      }
    }
    stage('Tests:unit') {
      steps {
        sh 'npm run test:unit'
      }
    }
  }
}
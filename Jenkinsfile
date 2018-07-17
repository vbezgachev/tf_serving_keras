node {
    def model_serving, detector_api, detector_app
    
    stage('Clone repository') {
        checkout scm
    }

    stage('Build model serving image') {
        model_serving = docker.build('model-serving', './model_serving')
    }

    stage('Build API image') {
        detector_api = docker.build('detector-api', './detector-api')
    }

    stage('Build app image') {
        detector_app = docker.build('detector-app', './detector-app')
    }
}

import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errorRate');

export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 1%
    errorRate: [
      // more than 10% of errors will abort the test
      { threshold: 'rate < 0.05', abortOnFail: true, delayAbortEval: '1m' },
    ],
    http_req_duration: ['p(95)<2500'], // 95 percent of response times must be below 500ms
  },
  
};

export function setup() {
  const signupUrl = `http://${__ENV.API_HOST}/api/signup`;
  
  const payload = JSON.stringify({
    "userName": "chandima",
    "password": "super_Scre@t"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

 http.post(signupUrl, payload, params);
}

export default function () {
  const signInUrl = `http://${__ENV.API_HOST}/api/signin`;
  
  const payload = JSON.stringify({
    "userName": "chandima",
    "password": "super_Scre@t"
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(signInUrl, payload, params);

  errorRate.add(response.status >= 400);

  sleep(1);
}

import http from 'k6/http';
import { sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errorRate');

const payload = JSON.stringify({
  userName: 'chandima',
  password: 'super_Scre@t',
});

const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const options = {
  duration: '1m',
  vus: 50,
  thresholds: {
    http_req_failed: ['rate<0.08'], // http errors should be less than 8%
    errorRate: [
      // more than 8% of errors will abort the test
      { threshold: 'rate < 0.08', abortOnFail: true, delayAbortEval: '1m' },
    ],
    http_req_duration: ['p(95)<2500'], // 95 percent of response times must be below 2500ms
  },
};

export function setup() {
  const signupUrl = `http://${__ENV.API_HOST}/api/signup`;

  http.post(signupUrl, payload, params);
}

export default function () {
  const signInUrl = `http://${__ENV.API_HOST}/api/signin`;

  const response = http.post(signInUrl, payload, params);

  errorRate.add(response.status >= 400);

  sleep(1);
}

import { STUDENT_API_URL } from "./const";


class StudentAPI {
  static HEADERS = {
    'Content-type': 'application/json; charset=UTF-8',
  };

  static request(uri = '', method = 'GET', data) {
    return fetch(`${STUDENT_API_URL}${uri}`, {
      method,
      headers: this.HEADERS,
      body: data ? JSON.stringify(data) : undefined,
    })
      .then((res) => res.json());
  }

  static getList() {
    return this.request();
  }

  static getOne(id) {
    return this.request(`/${id}`);
  }

  static create(data) {
    return this.request('', 'POST', data);
  }

  static update(id, data) {
    return this.request(`/${id}`, 'PUT', data);
  }

  static delete(id) {
    return this.request(`/${id}`, 'DELETE');
  }
}

export default StudentAPI;

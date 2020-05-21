import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FeedBackService } from '../../services/feedback-service';
import { HomePage } from '../home/home';
import { User } from '../../app/models/User';
import { Week } from '../../app/models/Week';
import { Hour } from '../../app/models/Hour';
import { Local } from '../../app/models/Local';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [FeedBackService, UserService]
})
export class SignUpPage {

  states = [{ estado: 'Acre', uf: 'AC' },
  { estado: 'Alagoas', uf: 'AL' },
  { estado: 'Amapá', uf: 'AP' },
  { estado: 'Amazonas', uf: 'AM' },
  { estado: 'Bahia', uf: 'BA' },
  { estado: 'Ceará', uf: 'CE' },
  { estado: 'Distrito Federal', uf: 'DF' },
  { estado: 'Espírito Santo', uf: 'ES' },
  { estado: 'Goiás', uf: 'GO' },
  { estado: 'Maranhão', uf: 'MA' },
  { estado: 'Mato Grosso', uf: 'MT' },
  { estado: 'Mato Grosso do Sul', uf: 'MS' },
  { estado: 'Minas Gerais', uf: 'MG' },
  { estado: 'Pará', uf: 'PA' },
  { estado: 'Paraíba', uf: 'PB' },
  { estado: 'Paraná', uf: 'PR' },
  { estado: 'Pernambuco', uf: 'PE' },
  { estado: 'Piauí', uf: 'PI' },
  { estado: 'Rio de Janeiro', uf: 'RJ' },
  { estado: 'Rio Grande do Norte', uf: 'RN' },
  { estado: 'Rio Grande do Sul', uf: 'RS' },
  { estado: 'Rondônia', uf: 'RO' },
  { estado: 'Roraima', uf: 'RR' },
  { estado: 'Santa Catarina', uf: 'SC' },
  { estado: 'São Paulo', uf: 'SP' },
  { estado: 'Sergipe', uf: 'SE' },
  { estado: 'Tocantins', uf: 'TO' },]

  state: any;
  user: User;
  name: any;
  email: any;
  password: any;
  passwordConfirm: any;

  week: any = {
    seg: { start: '', end: '', indisponivel: undefined },
    ter: { start: '', end: '', indisponivel: undefined },
    qua: { start: '', end: '', indisponivel: undefined },
    qui: { start: '', end: '', indisponivel: undefined },
    sex: { start: '', end: '', indisponivel: undefined },
    sab: { start: '', end: '', indisponivel: undefined },
    dom: { start: '', end: '', indisponivel: undefined }
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private events: Events, private userService: UserService, private storage: Storage, private app: App, private feedback: FeedBackService) {
    this.user = new User();
  }

  formatHour($event) {
    let value = $event.target.value;
    if (value.length > 2 && value.indexOf(':') == -1) {
      let hour = value.slice(0, 2);
      let min = value.slice(2, value.length);
      $event.target.value = hour + ':' + min;
    }
  }

  formatDays(): Week[] {
    let seg = this.formatHourForDays(this.week.seg);
    let ter = this.formatHourForDays(this.week.ter);
    let qua = this.formatHourForDays(this.week.qua);
    let qui = this.formatHourForDays(this.week.qui);
    let sex = this.formatHourForDays(this.week.sex);
    let sab = this.formatHourForDays(this.week.sab);
    let dom = this.formatHourForDays(this.week.dom);

    if ([seg, ter, qua, qui, sex, sab, dom].indexOf('noStart') != -1) {
      this.feedback.alert('Campo Obrigatório', 'Um horário inicial não foi preenchido');
      return null;
    }
    if ([seg, ter, qua, qui, sex, sab, dom].indexOf('noEnd') != -1) {
      this.feedback.alert('Campo Obrigatório', 'Um horário final não foi preenchido');
      return null;
    }
    if ([seg, ter, qua, qui, sex, sab, dom].indexOf('invalid') != -1) {
      this.feedback.alert('Erro', 'Um dos campos está com formato de hora inválido.');
      return null;
    }

    let weeks: Week[] = [{ id: undefined, hour: [{ id: undefined, horario: seg }], day: 'SEG' },
    { id: undefined, hour: [{ id: undefined, horario: ter }], day: 'TER' },
    { id: undefined, hour: [{ id: undefined, horario: qua }], day: 'QUA' },
    { id: undefined, hour: [{ id: undefined, horario: qui }], day: 'QUI' },
    { id: undefined, hour: [{ id: undefined, horario: sex }], day: 'SEX' },
    { id: undefined, hour: [{ id: undefined, horario: sab }], day: 'SAB' },
    { id: undefined, hour: [{ id: undefined, horario: dom }], day: 'DOM' }]

    return weeks;

  }

  formatHourForDays(day) {
    if (day.indisponivel) {
      return 'indisponivel';
    }

    if (!day.start && day.end) {
      return 'noStart';
    }

    if (day.start && !day.end) {
      return 'noEnd';
    }

    if(day.start && day.start.length != 5 || day.end && day.end.length != 5){
      return 'invalid'
    }

    if (!day.start && !day.end) {
      return '';
    }

    return day.start + '|' + day.end;

  }

  async save() {

    this.feedback.presentLoading();
    if (!this.name) {
      this.feedback.dismissLoading();
      this.feedback.alert('Campo Obrigatório', 'Campo "Nome" deve ser preenchido');
      return;
    }
    if (!this.email) {
      this.feedback.dismissLoading();
      this.feedback.alert('Campo Obrigatório', 'Campo "Email" deve ser preenchido');
      return;
    }

    this.user.name = this.name;

    let user = await this.userService.findByEmail(this.email);
    if(user)
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', 'Email já cadastrado');
      return;
    }
    this.user.email = this.email;

    if (!this.password) {
      this.feedback.dismissLoading();
      this.feedback.alert('Campo Obrigatório', 'Campo "Senha" deve ser preenchido');
      return;
    }

    if (this.password != this.passwordConfirm) {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', 'Senha não condiz com a confirmação de senha.');
      return;
    }

    if (this.password.length < 8) {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', 'Sua senha possui menos que 8 caracteres');
      return;
    }

    this.user.password = this.password;

    if (!this.state) {
      this.feedback.dismissLoading();
      this.feedback.alert('Campo Obrigatório', 'Selecione o campo "Estado"');
      return;
    }

    this.user.local = new Local(this.states.find(state => state.uf == this.state));

    let week = this.formatDays();
    if (!week) {
      this.feedback.dismissLoading();
      return;
    }
    this.user.week = week;

    let res = await this.userService.create(this.user);
    if(!res.success)
    {
      this.feedback.dismissLoading();
      this.feedback.alert('Erro', res.message);
      return;
    }
    this.storage.set('user', this.user);
    var nav = this.app.getRootNav();
    this.feedback.dismissLoading();
    this.events.publish('user', this.user);
    nav.setRoot(HomePage);
  }

}

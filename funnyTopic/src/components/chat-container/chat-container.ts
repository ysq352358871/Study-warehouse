declare var JMessage:any;
import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy, ViewContainerRef} from '@angular/core';
import { AdDirective } from '../ad.directive'
import { AdItem } from '../componentItem';
import { AdComponent } from '../dataInterface';
//import { JmessageChenyu } from 'jmessage-chenyu';
import { ChatEleComponent } from '../chat-ele/chat-ele';
/**
 * Generated class for the ChatContainerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat-container',
  templateUrl:'./chat-container.html'
})
export class ChatContainerComponent implements OnInit, OnDestroy{
  asd: AdItem[];
  currentAdIndex: number = -1;
  //@ViewChild(AdDirective) adHost: AdDirective;
  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
    //private Jmessage: JmessageChenyu
    ) {

  }
  ngOnInit() {
    this.NewAddReceiveMessageListener();
    //this.loadComponent();
    //this.getAds();
  }
  ngOnDestroy() {

  }
  ionViewDidLoad() {

  }
  loadComponent() {
    alert('load');
    if(!this.asd){
      return;
    }
    this.currentAdIndex = (this.currentAdIndex + 1) % this.asd.length;
    let adItem = this.asd[this.currentAdIndex];
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // let viewContainerRef = this.adHost.viewContainerRef;
    // viewContainerRef.clear();
    let componentRef = this.container.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }
  // getAds() {
  //   // this.interval = setInterval(() => {
  //   //   this.loadComponent();
  //   // }, 3000);
  // }
  NewAddReceiveMessageListener(){
    alert(1);
    JMessage.addReceiveMessageListener((msg)=>{
      // this.asd = [
      //   new AdItem(ChatEleComponent, {data:msg}),
      // ];
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(ChatEleComponent);
      // let viewContainerRef = this.adHost.viewContainerRef;
      // viewContainerRef.clear();
      let componentRef = this.container.createComponent(componentFactory);
      (<AdComponent>componentRef.instance).data = msg;
    });
  }
}

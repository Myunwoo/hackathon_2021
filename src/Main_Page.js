import React, {useRef} from "react";
import Header_bar from './components/Header_bar';
import Consent_component from './components/Consent_component';
import Shortcut_component from './components/Shortcut_component';
import EnergyShow_component from './components/EnergyShow_component';
import GasShow_component from './components/GasShow_component';
import MoneyShow_component from './components/MoneyShow_component';
import "./css/Main_page.css";

class Main_page extends React.Component{
    state={
        shortcuts:[
            {id:1, title:"mode1", target_compos:[1,2,3], target_modes:["a","a","b"]},
            {id:2, title:"mode2", target_compos:[1,2,3], target_modes:["b","b","c"]},
            {id:3, title:"mode3", target_compos:[1,2,3], target_modes:["c","a","b"]}
        ],
        components:[
            {id:1, title:"compo1", always_mode:true, autoshut_mode:false, setting_mode:false, power_consumption:50},
            {id:2, title:"compo2", always_mode:false, autoshut_mode:true, setting_mode:false, power_consumption:100},
            {id:3, title:"compo3", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:100}
        ]
    }

    componentDidMount(){
        console.log("componentDidMount");
    }

    componentModeChange = (id, modes) => {
        const compos =  this.state.components;
        for(var i=0;i<compos.length;i++){
            if(compos[i].id === id){
                this.state.components[i].always_mode = modes.always_mode;
                this.state.components[i].autoshut_mode = modes.autoshut_mode;
                this.state.components[i].setting_mode = modes.setting_mode;
            }
        }
        this.forceUpdate();
    }

    doShortcut = (childState) => {
        const targetCompos = childState.target_compos;
        const targetModes = childState.target_modes;

        const stateCompos = this.state.components;
        for(var i=0;i<stateCompos.length;i++){
            for(var j=0;j<targetCompos.length;j++){
                //targetModes[j]의 값을 stateCompos.mode값으로``
                if(stateCompos[i].id === targetCompos[j]){
                    if(targetModes[j] === "a"){
                        this.state.components[i].always_mode = true;
                        this.state.components[i].autoshut_mode = false;
                        this.state.components[i].setting_mode = false;
                    }else if(targetModes[j] === "b"){
                        this.state.components[i].always_mode = false;
                        this.state.components[i].autoshut_mode = true;
                        this.state.components[i].setting_mode = false;
                    }else if(targetModes[j] === "c"){
                        this.state.components[i].always_mode = false;
                        this.state.components[i].autoshut_mode = false;
                        this.state.components[i].setting_mode = true;
                    }
                }
            }
        }
        
        this.forceUpdate();
    }

    render(){
        const {shortcuts, components} = this.state;
        const {location, history} = this.props;
        return(
            <section className="app__section">
                <Header_bar location={location} history={history}/>
                <div className="main__section">
                    <div className="main__section__column">
                        <div className="shortcut__section">
                            {shortcuts.map(shortcut => (
                                <Shortcut_component
                                    key={shortcut.id}
                                    id={shortcut.id}
                                    title={shortcut.title}
                                    target_compos={shortcut.target_compos}
                                    target_modes={shortcut.target_modes}
                                    notification={this.doShortcut}
                                />
                            ))}
                        </div>

                        <div className="components__section">
                            {components.map(component => (
                                <Consent_component
                                    key={component.id}
                                    id={component.id}
                                    title={component.title}
                                    always_mode={component.always_mode}
                                    autoshut_mode={component.autoshut_mode}
                                    setting_mode={component.setting_mode}
                                    power_consumption={component.power_consumption}
                                    notification={this.componentModeChange}
                                />
                            ))}
                        </div>    
                    </div>
                    <div className="main__section__column">
                        <div className="show__section">
                            <EnergyShow_component components={components}/>
                            <GasShow_component components={components}/>
                            <MoneyShow_component components={components}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Main_page;
import React from 'react';
import {useSelector} from "react-redux";
import {Switch, Route, Link} from 'react-router-dom';
import {Scrollbars} from 'react-custom-scrollbars';

import "./scss/globalStyles.scss"

import Preloader from "./sections/preloader";
import ChoosePage from "./sections/choosePage";
import {PageAnimationWrapper} from "./components/AnimationWrappers";
import SimplePage from "./sections/simple";

// import ComplexMain from "./sections/complex";

function App() {

    const needPreloader = useSelector(({preloader}) => preloader.needPreloader);

    return (
        <>
            <div className="page-wrapper">
                <Scrollbars autoHide={true}>
                    <Switch>
                        <Route exact path="/">
                            {needPreloader && <Preloader/>}

                            <PageAnimationWrapper>
                                <ChoosePage/>
                            </PageAnimationWrapper>
                        </Route>
                        <Route exact path="/simple">
                            <PageAnimationWrapper>
                                <SimplePage/>
                            </PageAnimationWrapper>
                        </Route>

                        {/*<Route exact path="/simple" exact render={() => <SimpleMain/>}/>*/}
                        {/*<Route exact path="/complex" exact render={() => <ComplexMain/>}/>*/}
                        {/*<Route path="/chats/:id([0-9]+)" exact*/}
                        {/*       render={(obj) => <ChatAreaContainer id={Number(obj.match.params.id)} newMsg={false}/>}/>*/}
                    </Switch>
                </Scrollbars>

            </div>
        </>
    );
}

export default App;

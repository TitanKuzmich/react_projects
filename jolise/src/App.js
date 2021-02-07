import React from 'react';
import {useSelector} from "react-redux";
import {Switch, Route, Link} from 'react-router-dom';

import "./scss/globalStyles.scss"

import Preloader from "./sections/preloader";
import ChoosePage from "./sections/choosePage";
import {PageAnimationWrapper} from "./components/AnimationWrappers";
// import SimpleMain from "./sections/simple";
// import ComplexMain from "./sections/complex";

function App() {

    const needPreloader = useSelector(({preloader}) => preloader.needPreloader);

    return (
        <>
            <Switch>
                <Route exact path="/">
                    <div className="page-wrapper">
                        {needPreloader && <Preloader/>}

                        <PageAnimationWrapper>
                            <ChoosePage/>
                        </PageAnimationWrapper>
                    </div>
                </Route>
                {/*<Route exact path="/simple" exact render={() => <SimpleMain/>}/>*/}
                {/*<Route exact path="/complex" exact render={() => <ComplexMain/>}/>*/}
                {/*<Route path="/chats/:id([0-9]+)" exact*/}
                {/*       render={(obj) => <ChatAreaContainer id={Number(obj.match.params.id)} newMsg={false}/>}/>*/}
            </Switch>
        </>
    );
}

export default App;

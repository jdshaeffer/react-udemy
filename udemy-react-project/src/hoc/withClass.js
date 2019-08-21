// import React from 'react';

// const withClass = (props) => (
//     <div className={props.styles}>
//         {props.children}
//     </div>
// );

// export default withClass;

import React, {Component} from 'react';

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props}/> {/*spread operator - it passes on the props as it gets them*/}
//         </div>
//     )
// }

const withClass = (WrappedComponent, className) => { // a "class factory"
    const ConClass = class extends Component { //stateful component
        render() {
            return (
                <div className={className}>
                    <WrappedComponent ref={this.props.forwardedReference} {...this.props}/> {/*spread operator - it passes on the props as it gets them*/}
                </div>
            )
        }
    }
    return React.forwardRef((props,ref) => {
        return <ConClass {...props} forwardedReference={ref}/>; // all my props are passed
    })
}

export default withClass;
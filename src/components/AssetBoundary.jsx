import React, { Suspense, useEffect } from 'react';
import { Html } from '@react-three/drei';

class AssetError extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error) { console.error(`Could not load ${this.props.label}:`, error); }
  render() {
    if (this.state.failed) return <Html center><div role="alert" style={{background:'#302b28',color:'white',padding:12,borderRadius:8,width:220}}>Could not load {this.props.label}. Reload to try again.</div></Html>;
    return this.props.children;
  }
}

function Committed({ id, onReady, delay, children }) {
  useEffect(() => {
    const timer = setTimeout(() => onReady(id, true), delay);
    return () => { clearTimeout(timer); onReady(id, false); };
  }, [id, onReady, delay]);
  return children;
}

const noop = () => {};

export default function AssetBoundary({ id, onReady = noop, delay = 0, children }) {
  return <AssetError label={id}><Suspense fallback={null}>
    <Committed id={id} onReady={onReady} delay={delay}>{children}</Committed>
  </Suspense></AssetError>;
}

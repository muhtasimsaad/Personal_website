import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";


export default function ParticleBackground () {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div style={{ zIndex: -1, position: 'absolute',}}>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#171717",
                        },
                    },
                    fullScreen: 
                    { enable: true },

                    fpsLimit: 120,

                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "grab",
                            },
                            resize: true,
                        },
                        modes: {
                            grab: {
                              distance: 400,
                              line_linked: {
                                opacity: 1
                              }
                            },
                            bubble: {
                              distance: 400,
                              size: 40,
                              duration: 2,
                              opacity: 8,
                              speed: 3
                            },
                            repulse: {
                              distance: 200,
                              duration: 0.4
                            },
                            push: {
                              particles_nb: 4
                            },
                            remove: {
                              particles_nb: 2
                            }
                          }
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                            
                        },
                        
                        links: {
                            color: "#ffffff",
                            distance: 200,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                            // triangles: {
                            //     enable: true,
                            //     color: "#cccccc",
                            //     opacity: .1,
                            //   },
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed:1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.8,
                        },
                        shape: {
                            type: "circle",
                            size: 2,
                        },
                        
                        size: {
                            value: { min: 3, max: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />
        </div>
    );
};
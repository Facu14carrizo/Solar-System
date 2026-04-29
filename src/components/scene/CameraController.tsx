import { useRef, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useSimulation } from '../../hooks/useSimulation'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'

export function CameraController() {
  const controlsRef = useRef<OrbitControlsType>(null)
  const { camera, scene } = useThree()
  const { selectedPlanet, isCinematic } = useSimulation()

  const isAnimating = useRef(false)
  const animProgress = useRef(0)
  const startCamPos = useRef(new THREE.Vector3())
  const endCamPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const endTarget = useRef(new THREE.Vector3())
  
  const targetObject = useRef<THREE.Object3D | null>(null)
  
  const isMobile = useMemo(() => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent), [])

  useEffect(() => {
    if (controlsRef.current) {
      startCamPos.current.copy(camera.position)
      startTarget.current.copy(controlsRef.current.target)
      
      if (selectedPlanet) {
        const obj = scene.getObjectByName(selectedPlanet.id)
        targetObject.current = obj || null
        
        if (selectedPlanet.id === 'sun') {
          endTarget.current.set(0, 0, 0)
          endCamPos.current.set(0, 12, 35)
          if (isMobile) {
            endTarget.current.y -= 4 // Move sun up on mobile
          }
        } else if (obj) {
          endTarget.current.copy(obj.position)
          
          // Calculate camera distance
          const distance = selectedPlanet.radius * (isMobile ? 10 : 6) + (isMobile ? 12 : 4)
          const direction = new THREE.Vector3().subVectors(camera.position, obj.position).normalize()
          if (direction.lengthSq() < 0.1) direction.set(1, 0.4, 1).normalize()
          
          endCamPos.current.copy(obj.position).add(direction.multiplyScalar(distance))
          
          // On mobile, we need the planet in the TOP 40% of the screen
          if (isMobile) {
             // Target lower than the object to push object UP
             endTarget.current.y -= selectedPlanet.radius * 4 + 2
             endCamPos.current.y += selectedPlanet.radius * 2
          } else {
             endCamPos.current.y += selectedPlanet.radius * 1.5
          }
        } else {
          endTarget.current.set(0, 0, 0)
          endCamPos.current.set(20, 20, 20)
        }
      } else {
        targetObject.current = null
        endTarget.current.set(0, 0, 0)
        endCamPos.current.set(40, 50, 70)
      }

      isAnimating.current = true
      animProgress.current = 0
    }
  }, [selectedPlanet, scene, camera, isMobile])

  useFrame((_, delta) => {
    if (!controlsRef.current) return

    if (isAnimating.current) {
      animProgress.current += delta * 1.4
      const t = Math.min(animProgress.current, 1)
      const ease = 1 - Math.pow(1 - t, 4)

      if (targetObject.current) {
        const currentPos = new THREE.Vector3().copy(targetObject.current.position)
        if (isMobile && selectedPlanet) {
           currentPos.y -= selectedPlanet.radius * 4 + 2
        }
        endTarget.current.copy(currentPos)
      }

      camera.position.lerpVectors(startCamPos.current, endCamPos.current, ease)
      controlsRef.current.target.lerpVectors(startTarget.current, endTarget.current, ease)

      if (t >= 1) isAnimating.current = false
    } else if (targetObject.current && selectedPlanet) {
      // Keep following the target with offset
      const currentPos = new THREE.Vector3().copy(targetObject.current.position)
      if (isMobile) {
        currentPos.y -= selectedPlanet.radius * 4 + 2
      }
      
      const deltaMove = new THREE.Vector3().subVectors(currentPos, controlsRef.current.target)
      camera.position.add(deltaMove)
      controlsRef.current.target.copy(currentPos)
    }

    if (isCinematic && !isAnimating.current) {
      const time = Date.now() * 0.0001
      camera.position.x += Math.cos(time) * 0.02
      camera.position.z += Math.sin(time * 0.8) * 0.02
    }
    
    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      minDistance={1}
      maxDistance={1000}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={isMobile ? 0.7 : 0.4}
      zoomSpeed={1.2}
    />
  )
}

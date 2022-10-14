import "./style.css";
import * as BABYLON from "babylonjs";
import * as BABYLON_LOADER from "babylonjs-loaders";

const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

BABYLON.DefaultLoadingScreen.prototype.displayLoadingUI = function () {
  this._resizeLoadingUI();
  window.addEventListener("resize", this._resizeLoadingUI);
};

const createScene = function () {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color3.Black();

  scene.createDefaultCamera(false);
  scene.activeCamera.attachControl(canvas, false);
  scene.activeCamera.minZ = 0.25;
  scene.activeCamera.maxZ = 250;
  scene.activeCamera.position.set(0, 3, 15);
  scene.activeCamera.target = new BABYLON.Vector3(-1, 1.5, -3);
  scene.activeCamera.fov = (Math.PI / 4) * 0.75;
  scene.activeCamera.angularSensibility = 2000;
  scene.activeCamera.speed = 0.2;

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  const room = new BABYLON.SceneLoader.ImportMesh(
    "",
    "/models/",
    "Room_all.glb",
    scene
  );

  const exhibition = new BABYLON.SceneLoader.ImportMesh(
    "",
    "/models/",
    "Exhibition_A.glb",
    scene,
    function (newMeshes) {
      var mesh = newMeshes[0];
      mesh.scaling = new BABYLON.Vector3(0.04, 0.04, 0.04);
      mesh.position = new BABYLON.Vector3(15, 0.5, -2);
      mesh.rotation = new BABYLON.Vector3(0, 0, 0);
    }
  );

  return scene;
};

const sceneToRender = createScene();
engine.runRenderLoop(function () {
  sceneToRender.render();
});

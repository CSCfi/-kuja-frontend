import { append, find, flatten, map, propEq, zipObj } from "ramda";
import { procedures } from "./procedures";
import cytoscape from "cytoscape";
import cola from "cytoscape-cola";
import moment from "moment";

const isDebugOn = process.env.REACT_APP_DEBUG === "true";

/**
 * Instance of ProcedureHandler can be used to run procedures.
 * A procedure can be linked with other procedures forming a tree. The
 * tree will parsed by a procedure handler.
 *
 *  Example of a procedure tree:
 *
 *  tallennaJaLahetaMuutospyynto
 *     -- on success --> muutospyynnonTallennusOnnistui
 *                   --> asetaMuutospyynnonTilaksiAvoin
 *     -- on error   --> muutospyynnonLahettaminenEpaonnistui
 *
 *  asetaMuutospyynnonTilaksiAvoin
 *     -- on success --> muutospyynnonLahettaminenOnnistui
 *     -- on error   --> muutospyynnonLahettaminenEpaonnistui
 *
 *  muutospyynnonLahettaminenOnnistui
 *     -- on success --> getUrlOfMuutospyyntojenListaus
 *
 *  For more details see the procedures folder of this project.
 **/

function ProcedureHandler() {
  let results = [];

  function setResults(_results) {
    results = _results;
    return results;
  }

  async function run(
    name,
    source,
    input = [],
    edges = [],
    nodes = [],
    results = []
  ) {
    const procedure = procedures[name];
    if (procedure) {
      const _nodes = append({ data: { id: name } }, nodes);
      const zipd =
        input.length > 0 && procedure.input
          ? zipObj(procedure.input, input)
          : null;
      const result = await procedure.run(zipd);
      const output = procedure.output ? await procedure.output(result) : result;
      const nextProcedureNames = procedure.next ? procedure.next(output) : null;
      results.push({ name, source, output });
      /**
       * Let's run the next steps if there are any.
       */
      if (Array.isArray(nextProcedureNames)) {
        results.push(
          await Promise.all(
            map(async procedureName => {
              if (procedureName) {
                const _edges = append(
                  {
                    data: {
                      id: `${name}->${procedureName}`,
                      weight: 1,
                      source: name,
                      target: procedureName
                    }
                  },
                  edges
                );
                /**
                 * A new procedure handler is created here for better
                 * performance. The current procedure tree is branching here.
                 **/

                const procedureHandler = new ProcedureHandler();
                try {
                  return await procedureHandler.run(
                    procedureName,
                    flatten([output]),
                    name,
                    _edges,
                    _nodes,
                    results
                  );
                } catch (err) {
                  console.error(err);
                }
              }
            }, nextProcedureNames)
          )
        );
      }
      return results;
    } else {
      throw new Error(`Can't find the procedure named as ${name}.`);
    }
  }

  return {
    /**
     * A procedure tree can be drawn on a canvas. Implementation uses the
     * Cytoscape library for drawing.
     */
    draw: (results = []) => {
      if (!isDebugOn) {
        return false;
      }
      const canvas = document.createElement("div");
      canvas.setAttribute(
        "class",
        "z-50 r-0 t-0 bg-gray-100 w-full h-64 border-t border-b border-gray-300"
      );
      canvas.setAttribute("id", `cy-${Math.random()}`);
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      p1.textContent = `Date: ${moment().format("DD:MM:YYYY")}`
      p2.textContent = `Time: ${moment().format("HH:mm:ss")}`
      canvas.appendChild(p1);
      canvas.appendChild(p2);

      const container = document.getElementById("cy");
      const canvases = container.childNodes;
      if (canvases.length > 6) {
        container.removeChild(container.childNodes[0]);
      }
      container.appendChild(canvas);

      cytoscape.use(cola);

      cytoscape({
        container: canvas,

        boxSelectionEnabled: false,
        autounselectify: true,

        style: cytoscape
          .stylesheet()
          .selector("node")
          .style({
            label: "data(id)"
          })
          .selector("edge")
          .style({
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            width: 2,
            "line-color": "#ddd",
            "target-arrow-color": "#00FF00"
          })
          .selector(".highlighted")
          .style({
            "background-color": "#61bffc",
            "line-color": "#61bffc",
            "target-arrow-color": "#61bffc",
            "transition-property":
              "background-color, line-color, target-arrow-color",
            "transition-duration": "0.5s"
          }),

        elements: {
          nodes: map(result => {
            return { data: { id: result.name, title: result.title } };
          }, results),
          edges: map(result => {
            return result.source && result.name
              ? {
                  data: {
                    id: `${result.source}->${result.name}`,
                    source: result.source,
                    target: result.name
                  }
                }
              : null;
          }, results).filter(Boolean)
        },

        layout: {
          name: "cola",
          randomize: false,
          fit: false
        }
      });
    },
    getOutput: (name, _results) => {
      const outputObj = find(propEq("name", name), _results || results) || {};
      return outputObj.output;
    },
    /**
     * Main function.
     */
    run: async (name, input = [], source = null) => {
      console.info("Running procedure", name);
      const results = await run(name, source, input);
      return setResults(flatten(results));
    }
  };
}

export default ProcedureHandler;

/*
Copyright 2020 JamJar Authors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import ICollisionAlgorithm from "./icollision_algorithm";
import Vector from "../../../geometry/vector";
import IShape from "../../../shape/ishape";
import CollisionInfo from "../collision_info";

/**
 * GJKAlgorithm is the implementation of the Gilbert–Johnson–Keerthi distance
 * algorithm for collision detection.
 */
class GJKAlgorithm implements ICollisionAlgorithm {
    public CalculateCollisions(shapes: IShape[]): CollisionInfo[] {
        const collisions: CollisionInfo[] = [];
        for (let i = 0; i < shapes.length; i++) {
            for (let j = i + 1; j < shapes.length; j++) {
                const a = shapes[i];
                const b = shapes[j];
                const collision = this.gjk(a,b);
                if (collision !== undefined) {
                    collisions.push(collision);
                }
            }
        }
        return collisions;
    }

    private gjk(a: IShape, b: IShape): CollisionInfo | undefined {
        // Build a new Simplex for determining if a collision has occurred
        const simplex: Vector[] = [];

        // Choose the starting direction as from A center to B center
        let direction: Vector | undefined = b.Center().Sub(a.Center());

        // Get the first support point and add it to the simplex
        const initSupportPoint = this.support(a, b, direction);
        simplex.push(initSupportPoint);

        // First support point was calculated from the origin, so the next search direction
        // should be its inverse to get a point on the opposite side of the Minkowski Difference
        direction = initSupportPoint.Invert();

        // Keep iterating until the direction is undefined, this will occur when
        // 'CalculateDirection' doesn't return a direction, indicating that an
        // intersection has been detected
        while(direction) {
            const supportPoint = this.support(a, b, direction);

            // If the support point did not reach as far as the origin,
            // the simplex must not contain the origin and therefore there is no
            // intersection
            if (supportPoint.Dot(direction) <= 0) {
                // No intersection
                return;
            }

            // Add the simplex and determine a new direction
            simplex.push(supportPoint);
            direction = this.calculateDirection(simplex);
        }
        // No direction calculated, intersection detected
        return new CollisionInfo(a, b);
    }

    private support(a: IShape, b: IShape, direction: Vector): Vector {
        const aFar = a.FarthestPointInDirection(direction);
        const bFar = b.FarthestPointInDirection(direction.Invert());
        return aFar.Sub(bFar);
    }

    private calculateDirection(points: Vector[]): Vector | undefined {
        // Get a, the last point added to the simplex
        const a = points[points.length - 1];
        // Since a was just added, we know that the inverse of a points
        // towards the origin
        const ao = a.Invert();
        // If the simplex is a triangle
        if (points.length === 3) {
            // B is the penultimate in the simplex
            // C is the oldest point in the simplex
            const b = points[1];
            const c = points[0];

            // Determine a->b and a->c lines
            const ab = b.Sub(a);
            const ac = c.Sub(a);

            // Determine perpendicular of the a->b line
            let abPerp = new Vector(ab.y, -ab.x);

            // Check the handedness of the perpendicular, it should
            // face AWAY from the simplex
            if (abPerp.Dot(c) >= 0) {
                abPerp = abPerp.Invert();
            }

            // If the origin lies outside of the simplex. remove the
            // point and determine a new direction in the direction
            // of the perpendicular; aiming to try to encapsulate
            // the origin that lies outside
            if (abPerp.Dot(ao) > 0) {
                points.splice(0, 1);
                return abPerp;
            }

            // Determine perpendicular of the a->c line
            let acPerp = new Vector(ac.y, -ac.x);

            // Check the handedness of the perpendicular, it should
            // face AWAY from the simplex
            if (acPerp.Dot(b) >= 0) {
                acPerp = acPerp.Invert();
            }

            // If the origin lies outside of the simplex. remove the
            // point and determine a new direction in the direction
            // of the perpendicular; aiming to try to encapsulate
            // the origin that lies outside
            if (acPerp.Dot(ao) > 0) {
                points.splice(1, 1);
                return acPerp;
            }
            return undefined;
        }
        // Otherwise the simplex is just a line
        // B is the penultimate point in the simplex,
        // in this case the other end of the line
        const b = points[0];
        // Determine a -> b line
        const ab = b.Sub(a);

        // Get the perpendicular of the a->b line
        let abPerp = new Vector(ab.y, -ab.x);

        // Check the handedness of the perpendicular, it should
        // face TOWARDS the origin
        if (abPerp.Dot(ao) <= 0) {
            abPerp = abPerp.Invert();
        }
        return abPerp;
    }
}

export default GJKAlgorithm;

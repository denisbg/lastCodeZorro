import pygame
import random

# Définition des constantes
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 600
BLOCK_SIZE = 30
ROWS = 20
COLS = 10
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
FONT_SIZE = 36

# Formes des blocs
SHAPES = [
    [[1, 1, 1],
     [0, 1, 0]],

    [[0, 2, 2],
     [2, 2, 0]],

    [[3, 3],
     [3, 3]],

    [[4, 4, 4, 4]],

    [[0, 5, 0],
     [5, 5, 5]],

    [[6, 0],
     [6, 0],
     [6, 6]],

    [[0, 7],
     [0, 7],
     [7, 7]]
]

# Définition des événements personnalisés
GAME_OVER_EVENT = pygame.USEREVENT + 1

class Block:
    def __init__(self, shape):
        self.shape = shape
        self.color = (random.randint(50, 255), random.randint(50, 255), random.randint(50, 255))
        self.x = COLS // 2 - len(shape[0]) // 2
        self.y = 0

    def move_down(self):
        self.y += 1

    def move_left(self):
        self.x -= 1

    def move_right(self):
        self.x += 1

    def rotate(self):
        self.shape = [[self.shape[y][x] for y in range(len(self.shape))] for x in range(len(self.shape[0]))[::-1]]

    def get_blocks_positions(self):
        positions = []
        for y in range(len(self.shape)):
            for x in range(len(self.shape[y])):
                if self.shape[y][x] != 0:
                    positions.append((self.x + x, self.y + y))
        return positions


def draw_board(screen, board):
    for y in range(ROWS):
        for x in range(COLS):
            if board[y][x] != 0:
                pygame.draw.rect(screen, board[y][x], (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))
                pygame.draw.rect(screen, BLACK, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE), 1)


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
    pygame.display.set_caption("Tetris")
    clock = pygame.time.Clock()
    font = pygame.font.Font(None, FONT_SIZE)

    board = [[0] * COLS for _ in range(ROWS)]

    current_block = Block(random.choice(SHAPES))
    next_block = Block(random.choice(SHAPES))

    score = 0

    while True:
        screen.fill(BLACK)

        # Contrôles
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_LEFT:
                    current_block.move_left()
                    if any((x < 0 or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_right()
                elif event.key == pygame.K_RIGHT:
                    current_block.move_right()
                    if any((x >= COLS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_left()
                elif event.key == pygame.K_DOWN:
                    current_block.move_down()
                    if any((y >= ROWS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
                        current_block.move_up()
                elif event.key == pygame.K_SPACE:
                    current_block.rotate()
                    if any((x < 0 or x >= COLS or y >= ROWS or board[y][x] != 0) for x, y in
                           current_block.get_blocks_positions()):
                        current_block.rotate()

        # Déplacer le bloc vers le bas
        current_block.move_down()
        if any((y >= ROWS or board[y][x] != 0) for x, y in current_block.get_blocks_positions()):
            current_block.move_up()
            for x, y in current_block.get_blocks_positions():
                board[y][x] = current_block.color
            current_block = next_block
            next_block = Block(random.choice(SHAPES))

            # Vérification des lignes complètes
            full_rows = [i for i, row in enumerate(board) if all(cell != 0 for cell in row)]
            for row in full_rows:
                del board[row]
                board.insert(0, [0] * COLS)
                score += 100

            # Vérification du game over
            if any(cell != 0 for cell in board[0]):
                pygame.event.post(pygame.event.Event(GAME_OVER_EVENT))

        # Dessiner le tableau
        draw_board(screen, board)

        # Dessiner le bloc courant
        for x, y in current_block.get_blocks_positions():
            pygame.draw.rect(screen, current_block.color, (x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE))

        # Affichage du score
        score_text = font.render(f"Score: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        pygame.display.flip()
        clock.tick(5)


if __name__ == "__main__":
    main()
